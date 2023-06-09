import "./home.scss";
import { Link, useNavigate } from "react-router-dom";
import { FcCheckmark } from "react-icons/fc";
import ChainLink from "../assets/Chainlink-logo.png";
import AWS from "../assets/AWS.svg";
import Flow from "../assets/Flow.svg";
import QuickNode from "../assets/QuickNode.svg";
import SpaceAndTime from "../assets/SpaceAndTime.png";
import Cover from "../assets/cover.png";
import "../bootstrap.min.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";
import { useAccount } from "wagmi";

function Home() {
  const { isConnected } = useAccount();
  const { address } = useAccount();
  const navigate = useNavigate();
  useEffect(() => {
    if (isConnected) {
      navigate(`/profile/${address}`);
    }
  }, [isConnected]);
  return (
    <>
      <div className="app">
        <main className="app__main">
          <div className="app__top">
            <img src={Cover} alt="TradeGuide" style={{ width: "25rem" }} />
          </div>
          <div className="app__motto">
            <div className="app__motto-lg">Trade Guide</div>
            <div className="app__motto-sm">
              we provide a list of trades, you decide which to set up your trade
              as
            </div>
          </div>
          <Link to="" className="app__btn">
            <ConnectButton label="Get started" />
          </Link>

          <div className="achievements">
            <div className="achievements-div">
              <h1>1245+</h1>
              <p>Happy Clients</p>
            </div>
            <div className="achievements-div">
              <h1>100+</h1>
              <p>Completed Trades</p>
            </div>
            <div className="achievements-div">
              <h1>5146+</h1>
              <p>Professional Traders</p>
            </div>
            <div className="achievements-div">
              <h1>50,000 +</h1>
              <p>Users</p>
            </div>
          </div>
        </main>

        {/* SPONSORS */}
        <section className="sponsors">
          <div className="sponsors-img">
            <img
              src={ChainLink}
              alt="chainlink logo"
              className="sponsors-img-chainlink"
            />
            <img
              src={AWS}
              alt="chainlink logo"
              className="sponsors-img-chainlink"
            />
            <img
              src={QuickNode}
              alt="chainlink logo"
              className="sponsors-img-chainlink"
            />
            <img
              src={SpaceAndTime}
              alt="chainlink logo"
              className="sponsors-img-chainlink"
            />
            <img
              src={Flow}
              alt="chainlink logo"
              className="sponsors-img-chainlink"
            />
          </div>
        </section>

        {/* CARDS */}
        <section className="about">
          <div className="about__card about__card-1">
            Take a pick from our list of top traders and decide whom you want to
            subscribe to. This list contains the best of the best traders on our
            platform, so rest assured you are in good hands. dit esse nihil
            explicabo molestiae incidunt, repe.
          </div>
          <div className="about__card about__card-2">
            Look through a subscribed traders history and see what they've being
            up to. Subscribe and geta feel around at how professional traders
            look at the market Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Eos architecto nisi bags.
          </div>
          <div className="about__card about__card-3">
            Never miss a trade, Receive notifications when your preferred
            (subscribed) trader is about to make a trade, so you follow along as
            they do. And see how they set all their parameters, simply get a
            feel at real trading strategies. Lorem ipsum dolor
          </div>
          <div className="about__card about__card-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quae
            ducimus officiis! Illum saepe, non est similique suscipit placeat.
            Possimus adipisci sapiente tempore harum iusto atque accusantium
            quae, quos quisquam.
          </div>
        </section>

        {/* CARD2 */}
        <section className="services py-5">
          <div className="services__card-1 services__card">
            <h2 className="services__card-h2">
              More Than A 1000 succesful Trades
            </h2>
            <p className="services__card-p">
              With a history of over 1000 succesful trades, you know our
              resources are totally tested and trusted and that our platform
              provides the best of the best with minified risk of failure. We
              provide the absolute best, which you can see from our Top Traders
              section. accusamus quam obcaecati sequi neque, repellendus eum
              quasi quibusdam. Qui expedita asperiores dolorem voluptatum
            </p>
            <FcCheckmark className="services__card-icon" />
          </div>
          <div className="services__card-2 services__card">
            <h2 className="services__card-h2">
              Follow trends of succesful traders
            </h2>
            <p className="services__card-p">
              We know how intimidating trading as a beginner can be, so your
              first trades would be totally guided by the traders you subscribe
              to to reduce your chances of loss, everything you need to know
              about a trade is specifically provided and tailored for you.
              neque, repellendus eum quasi quibusdam. Qui expedita asperiores
              dolorem voluptatum
            </p>
            <FcCheckmark className="services__card-icon" />
          </div>
          <div className="services__card-3 services__card">
            <h2 className="services__card-h2">Learn with InApp Tutorials</h2>
            <p className="services__card-p">
              While trading the traders you subscribe to also provide trasing
              tutorial videos that include trading techniques, strategies and
              many more. sed, esse dicta asperiores accusantium, aspernatur quae
              placeat ab voluptate mollitia accusamus quam obcaecati sequi
              neque, repellendus eum quasi quibusdam. Qui expedita asperiores
              dolorem voluptatum.Accusamus, voluptas? Odit unde eius porro odio?
            </p>
            <FcCheckmark className="services__card-icon" />
          </div>
        </section>

        {/* FOOTER */}
        <footer
          className="text-center text-white footer"
          style={{
            backgroundImage: "linear-gradient(to right, #3d55c0, #2f5cff)",
          }}
        >
          <div className="container">
            <section className="mt-5">
              <div className="row text-center d-flex justify-content-center pt-5">
                <div className="col-md-2">
                  <h6 className="text-uppercase font-weight-bold">
                    <a href="#!" className="text-white">
                      About us
                    </a>
                  </h6>
                </div>

                <div className="col-md-2">
                  <h6 className="text-uppercase font-weight-bold">
                    <a href="#!" className="text-white">
                      Products
                    </a>
                  </h6>
                </div>
                <div className="col-md-2">
                  <h6 className="text-uppercase font-weight-bold">
                    <a href="#!" className="text-white">
                      Awards
                    </a>
                  </h6>
                </div>
                <div className="col-md-2">
                  <h6 className="text-uppercase font-weight-bold">
                    <a href="#!" className="text-white">
                      Help
                    </a>
                  </h6>
                </div>
                <div className="col-md-2">
                  <h6 className="text-uppercase font-weight-bold">
                    <a href="#!" className="text-white">
                      Contact
                    </a>
                  </h6>
                </div>
              </div>
            </section>

            <hr className="my-5" />
            <section className="mb-5">
              <div className="row d-flex justify-content-center">
                <div className="col-lg-8">
                  <h4>
                    Made by heeze and zeke as a project for the Chainlink Spring
                    Hackathon 2023.
                  </h4>
                </div>
              </div>
            </section>
            <section className="text-center mb-5">
              <a href="" className="text-white me-4">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="" className="text-white me-4">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="" className="text-white me-4">
                <i className="fab fa-google"></i>
              </a>
              <a href="" className="text-white me-4">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="" className="text-white me-4">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="" className="text-white me-4">
                <i className="fab fa-github"></i>
              </a>
            </section>
          </div>
          <div
            className="text-center p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            © 2023 Copyright
            <a className="text-white" href="#">
              &nbsp;TradeGuide
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Home;
