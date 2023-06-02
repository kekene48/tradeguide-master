import "./home.scss";
import { Link } from "react-router-dom";
import { FcCheckmark } from "react-icons/fc";
import ChainLink from "../assets/Chainlink-logo.png";
import AWS from "../assets/AWS.svg";
import Flow from "../assets/Flow.svg";
import QuickNode from "../assets/QuickNode.svg";
import SpaceAndTime from "../assets/SpaceAndTime.png";
import "../bootstrap.min.css";

function Home() {
  return (
    <>
      <div className="app">
        <main className="app__main">
          <div className="app__top">
            <div className="app__logo"></div>
            <div className="app__title">Trade Guide</div>
          </div>
          <div className="app__motto">
            <div className="app__motto-lg">Trade Guide</div>
            <div className="app__motto-sm">
              we provide a list of trades, you decide which to set up your trade
              as
            </div>
          </div>
          <Link to="/main" className="app__btn">
            Get Started
          </Link>
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab ad sit
            nesciunt laboriosam dolore autem quo. Fugit omnis tempore alias odit
            esse nihil explicabo molestiae incidunt, repellendus ea.
            Necessitatibus, facere.
          </div>
          <div className="about__card about__card-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
            architecto nisi laudantium earum pariatur excepturi, facere eum
            iusto voluptatum ullam blanditiis, provident dolorem perspiciatis
            dolor eius expedita? Asperiores, quasi culpa.
          </div>
          <div className="about__card about__card-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quae
            ducimus officiis! Illum saepe, non est similique suscipit placeat.
            Possimus adipisci sapiente tempore harum iusto atque accusantium
            quae, quos quisquam.
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem a
              ipsum expedita alias quae rem. Hic quod nihil corporis doloremque
              consequuntur sed, esse dicta asperiores accusantium, aspernatur
              quae placeat ab voluptate mollitia accusamus quam obcaecati sequi
              neque, repellendus eum quasi quibusdam. Qui expedita asperiores
              dolorem voluptatum
            </p>
            <FcCheckmark className="services__card-icon" />
          </div>
          <div className="services__card-2 services__card">
            <h2 className="services__card-h2">
              Follow trends of succesful trades
            </h2>
            <p className="services__card-p">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem a
              ipsum expedita alias quae rem. Hic quod nihil corporis doloremque
              consequuntur sed, esse dicta asperiores accusantium, aspernatur
              quae placeat ab voluptate mollitia accusamus quam obcaecati sequi
              neque, repellendus eum quasi quibusdam. Qui expedita asperiores
              dolorem voluptatum
            </p>
            <FcCheckmark className="services__card-icon" />
          </div>
          <div className="services__card-3 services__card">
            <h2 className="services__card-h2">
              Trade Along with Minified risk
            </h2>
            <p className="services__card-p">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem a
              ipsum expedita alias quae rem. Hic quod nihil corporis doloremque
              consequuntur sed, esse dicta asperiores accusantium, aspernatur
              quae placeat ab voluptate mollitia accusamus quam obcaecati sequi
              neque, repellendus eum quasi quibusdam. Qui expedita asperiores
              dolorem voluptatum
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
                  <p>
                    Made by Kelvin EKene and Eze Hope as a project for the
                    Chainlink Spring Hackathon 2023.
                  </p>
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
              &nbsp; &nbsp;TradeGuide
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Home;
