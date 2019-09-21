<template>
  <div id="map" style="width: 100%; height: 100%;"></div>
</template>

<script>
  import gmapsInit from "../utils/gmaps"
  import GPXParser from "../plugins/gpxParser"

  export default {
    name: 'App',

    async mounted() {
      try {
        const google = await gmapsInit();

        const mapOptions = {
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        };

        const map = new google.maps.Map(document.getElementById('map'), mapOptions)

        this.loadGPXFileIntoGoogleMap(map, `/api/trips/gpx/${this.$route.params.id}`)

      } catch (error) {
        //
      }
    },

    methods: {

      loadGPXFileIntoGoogleMap(map, filePath) {
        axios.get(filePath)
            .then(response => {

              // Parse string from response into xml document...
              const parser = new DOMParser();
              const xmlDoc = parser.parseFromString(response.data.response,"text/xml");
              // Init gpx parser
              let gpxParser = new GPXParser(xmlDoc, map);
              gpxParser.setTrackColour("#ff0000");     // Set the track line colour
              gpxParser.setTrackWidth(5);          // Set the track line width
              gpxParser.setMinTrackPointDelta(0.001);      // Set the minimum distance between track points
              gpxParser.centerAndZoom(xmlDoc);
              gpxParser.addTrackpointsToMap();         // Add the trackpoints
              gpxParser.addRoutepointsToMap();         // Add the routepoints
              gpxParser.addWaypointsToMap();           // Add the waypoints

            })
      }

    }
  };
</script>

<style>
  html,
  body {
    width: 100%;
    height: 100%
  }

  body {
    margin: 0;
  }
</style>