import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { gql, useMutation, useSubscription } from "@apollo/client";
import { FULL_ORDER_FRAGMENT } from "../../fragments";
import { CoockedOrdersSubscription, TakeOrderMutation, TakeOrderMutationVariables } from "../../gql/graphql";
import { Link, useHistory } from "react-router-dom";

const COOKED_ORDERS = gql`
  subscription coockedOrders {
    cookedOrders {
      ...FullOrderParts
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;

const TAKE_ORDER = gql`
  mutation takeOrder($input: TakeOrderInput!){
    takeOrder(input:$input){
      ok 
      error
    }
  }
`

interface ICoords {
  lat: number;
  lng: number;
}

interface IDriverProps {
  lat: number;
  lng: number;
  $hover?: any;
}

const Driver: React.FC<IDriverProps> = () => <div className="text-xl">🚖</div>;

export const Dashboard = () => {
  const [driverCoords, setDriverCoords] = useState<ICoords>({
    lat: 0,
    lng: 0,
  });
  const [map, setMap] = useState<google.maps.Map>();
  const [maps, setMaps] = useState<any>();
  const onSuccess = ({
    coords: { latitude, longitude },
  }: GeolocationPosition) => {
    setDriverCoords({ lat: latitude, lng: longitude });
  };
  const onError = (error: GeolocationPositionError) => {
    console.log(error);
  };
  useEffect(() => {
    navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
    });
  }, []);

  useEffect(() => {
    if (map && maps) {
      map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng));
      // const geocoder = new google.maps.Geocoder();
      // geocoder.geocode({location: new google.maps.LatLng(driverCoords.lat, driverCoords.lng)}, (results, status) => {
      //   console.log(status, results);
      // })
    }
  }, [driverCoords.lat, driverCoords.lng]);
  const onApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    setMap(map);
    setMaps(maps);
    map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng));
  };
  const makeRoute = () => {
    if (map) {
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);
      directionsService.route(
        {
          origin: {
            location: new google.maps.LatLng(
              driverCoords.lat,
              driverCoords.lng
            ),
          },
          destination: {
            location: new google.maps.LatLng(
              driverCoords.lat + 0.05,
              driverCoords.lng + 0.05
            ),
          },
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result) => {
          directionsRenderer.setDirections(result);
        }
      );
    }
  };

  const { data: coockedOrdersData } =
    useSubscription<CoockedOrdersSubscription>(COOKED_ORDERS);
  useEffect(() => {
    if (coockedOrdersData?.cookedOrders.id) {
      makeRoute();
    }
  }, [coockedOrdersData]);
  const history = useHistory();
  const onCompleted = (data:TakeOrderMutation) => {
    if(data.takeOrder.ok){
      history.push(`/orders/${coockedOrdersData?.cookedOrders.id}`)
    }
  }
  const [takeOrderMutation ] = useMutation<TakeOrderMutation, TakeOrderMutationVariables>(TAKE_ORDER, {onCompleted})
  const triggerMutation = (orderId: number) => {
    takeOrderMutation({
      variables:{
        input: {
          id: orderId
        }
      }
    })
  }
  return (
    <div>
      <div
        className="overflow-hidden"
        style={{ width: window.innerWidth, height: "50vh" }}
      >
        <GoogleMapReact
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={onApiLoaded}
          defaultZoom={16}
          defaultCenter={{ lat: 43.33, lng: -81.13 }}
          bootstrapURLKeys={{ key: "AIzaSyDZ9vx8c0F4FawJ82L-Do3xo1NCfAm-InA" }}
        >
          {/* <Driver lat={driverCoords.lat} lng={driverCoords.lng} /> */}
        </GoogleMapReact>
      </div>
      <div className="max-w-screen-sm mx-auto bg-white relative -top-10 shadow-lg py-8 px-5">
        {coockedOrdersData?.cookedOrders.restaurant ? (
          <>
            <h1 className="text-center text-3xl font-medium">
              New Coocked Order
            </h1>
            <h4 className="text-center my-3 text-2xl font-medium">
              Pick it up soon @
              {coockedOrdersData?.cookedOrders.restaurant?.name}
            </h4>
            <button
              onClick={() => triggerMutation(coockedOrdersData?.cookedOrders.id)}
              className="btn w-full mt-5 block text-center"
            >
              Accept Challenge &rarr;
            </button>
          </>
        ) : (
          <h1 className="text-center text-3xl font-medium">No orders yet...</h1>
        )}
      </div>
    </div>
  );
};
