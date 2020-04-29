import React from "react";
import { Map, Placemark, SearchControl, RouteButton } from "react-yandex-maps";
import { Typography } from "@material-ui/core";

const Ymap = ({ className, lat, long, name }) => {
  return (
    <div style={{ padding: "100px 0 50px 0" }}>
      <Typography
        color="primary"
        gutterBottom={true}
        align="left"
        variant="h4"
        component="h3"
      >
        {name}'s office address
      </Typography>
      <Map
        className={className}
        defaultState={{
          center: [lat, long],
          zoom: 13,
          controls: ["zoomControl", "fullscreenControl"],
        }}
        modules={["control.ZoomControl", "control.FullscreenControl"]}
      >
        <Placemark geometry={[lat, long]} />
        <SearchControl options={{ float: "right" }} />
        <RouteButton options={{ float: "right" }} />
      </Map>
    </div>
  );
};

export default Ymap;
