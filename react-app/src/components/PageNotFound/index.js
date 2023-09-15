import './stylePageNotFound.css'
import logo from './capTwoLogo.png'

export const PageNotFound = () => {


  return (

      <div id='page-not-found-entire'>

            <div id="container">
                  <img id='logo-cup' src={logo} />
                  <div class="steam" id="steam1">
                  {" "}
                  </div>
                  <div class="steam" id="steam2">
                  {" "}
                  </div>
                  <div class="steam" id="steam3">
                  {" "}
                  </div>
                  <div class="steam" id="steam4">
                  {" "}
                  </div>

                  <div id="cup">
                  <div id="cup-body">
                  <div id="cup-shade"></div>
                  </div>
                  <div id="cup-handle"></div>
                  </div>

                  <div id="saucer"></div>

                  <div id="shadow"></div>
                  <div id='sorry'>Deep apologies</div>
                  <div id='sorry-explained'>It seems we're still working on this page</div>

            </div>
      </div>

  );
};
