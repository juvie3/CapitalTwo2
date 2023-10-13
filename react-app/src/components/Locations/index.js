import "./styleLocation.css"

export const Locations = () => {


      return (

            <div id="outer-map-div">
                  <div id="locations-text">Currently, we are only showing locations in the DC area.</div>
                  <iframe id='map' src="https://my.atlist.com/map/fcfd7bd1-3435-4724-abed-de738054b54b?share=true" allow="geolocation 'self' https://my.atlist.com" frameborder="0" scrolling="no" allowfullscreen></iframe>

            </div>
      )

}
