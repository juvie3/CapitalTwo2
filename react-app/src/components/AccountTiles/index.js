import "./styleAccountTiles.css";
import tileBack from "./capTile.jpeg";

export const AccountTiles = ({ account }) => {
  let dollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handleNewAcct = () => {};

  if (account.accountType == "checking") account.accountType = "Checking";
  if (account.accountType == "savings") account.accountType = "Savings";

  return (
    <div id="entire-tile-holder">
      {account.accountType == "Checking" ? (
        <div id="account-tile">
          <div id="left-account-tile">
            <div id="left-text-1-acct-tile">{`360 ${account.accountType} Acct`}</div>
            <div id="left-text-2-acct-tile">{dollar.format(account.funds)}</div>
            <div id="left-text-3-acct-tile">AVAILABLE BALANCE</div>
          </div>
          <div id="view-account-butt-holder">
            <div
              className="grow"
              onClick={handleNewAcct}
              id="view-account-butt"
            >
              View Account
            </div>
          </div>
        </div>
      ) : (
        <div id="account-tile" style={{ backgroundImage: `url(${tileBack})` }}>
          <div id="left-account-tile">
            <div id="left-text-1-acct-tile">{`360 ${account.accountType} Acct`}</div>
            <div id="left-text-2-acct-tile">{dollar.format(account.funds)}</div>
            <div id="left-text-3-acct-tile">AVAILABLE BALANCE</div>
          </div>
          <div id="view-account-butt-holder">
            <div
              className="grow"
              onClick={handleNewAcct}
              id="view-account-butt"
            >
              View Account
            </div>
          </div>
        </div>
      )}

      {/* <div id="account-tile" style={{ backgroundImage:`url(${tileBack})` }}>
        <div id="left-account-tile">
          <div id="left-text-1-acct-tile">{`360 ${account.accountType} Acct`}</div>
          <div id="left-text-2-acct-tile">{dollar.format(account.funds)}</div>
          <div id="left-text-3-acct-tile">AVAILABLE BALANCE</div>
        </div>
        <div id="view-account-butt-holder">
          <div className="grow" onClick={handleNewAcct} id="view-account-butt">
            View Account
          </div>
        </div>
      </div> */}

      {/* <div id="lower-left-account-box">
        <div id="left-lower-left-panel-account-box">
          <div id="lower-left-text-1-acct-box">Explore other products</div>
          <div id="lower-left-text-2-acct-box">
            Explore all our products now to find an account that's right for
            you.
          </div>
        </div>
        <div id="butt-holder">
          <div
            className="grow"
            onClick={handleNewAcct}
            id="lower-left-text-3-acct-box"
          >
            Open a new account
          </div>
        </div>
      </div> */}
    </div>
  );
};
