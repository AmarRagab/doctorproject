import React from "react";

const HeaderContainer = () => {
    return (
        <div className="header-top colored">
            <div className="container">
                <div className="row">
                    <div className="col-4 col-sm-4 col-lg-4">
                        <div className="header-top-first clearfix">
                            <ul className="list-inline"> <li className="list-inline-item">
                                <a href="https://www.mashreqins.com/en/medical" className="link-light language" title="Language">
                                    <i className="fa fa-globe pr-1"></i> English </a>
                            </li> </ul>  </div> </div> <div className="col-8 col-sm-8 col-lg-8">
                        <div id="header-top-second" className="clearfix text-right">
                            <ul className="list-inline">
                                <li className="list-inline-item ltr">02 2958 090<i className="fa fa-phone pr-10 pl-10 font-14">
                                </i>
                                </li>
                                <li className="list-inline-item">
                                    <a href="http://www.facebook.com/mashreq.pal/?business_id=1573055672954962" target="_blank">
                                        <i className="fa fa-facebook font-14"></i> </a> </li>
                            </ul> </div> </div> </div>
            </div> </div>
    );
}

export default HeaderContainer;