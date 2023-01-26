import React from "react";
import Sidebar from "../component/Sidebar";
import Layout from "../component/Layout";
import Menu from "../component/Menu";
import { common } from "../common/utils";

const Home = () => {
    return (
        <>
            <Layout>
                <div>
                    <div className='row'>
                        <div className="col-md-3 col-3">
                            <Sidebar />
                        </div>
                        <div className="col-md-8 mt-5 col-8">
                            <Menu />
                        </div>
                    </div>
                </div>
            </Layout>
        </>

    );
};



export default common(Home);
