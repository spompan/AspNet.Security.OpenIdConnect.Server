﻿/*global document, JSON, helpers, XMLHttpRequest */

(function (document, JSON, helpers, XMLHttpRequest) {

    'use strict';

    var btn,
        result;

    function authenticationRequest() {

        var xmlhttp,
            obj,
            params,
            username,
            password,
            result;

        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {

            result = document.getElementById("identity-result");
            result.innerHTML = "";

            if (xmlhttp.readyState === XMLHttpRequest.DONE) {
                obj = JSON.parse(xmlhttp.responseText);
                result.innerHTML = helpers.makeFriendlyString(obj);
            } else if (xmlhttp.status === 400) {
                result.innerHTML = "There was an error 400.";
            } else {
                result.innerHTML = "Something other than 200 returned. Maybe just wait - it sometimes takes 30 seconds.";
            }
        };

        username = document.getElementById("username").value;
        password = document.getElementById("password").value;

        // the resource parameter must match the OAuth audience
        // so we're only using it locally
        params = "username=" + username + "&password=" + password + "&grant_type=password";
        if (document.location.hostname.indexOf("localhost") > -1) {
            params += "&resource=localhost";
        }

        xmlhttp.open("POST", "/connect/token", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.setRequestHeader("Content-length", params.length);
        xmlhttp.send(params);
    }

    btn = document.getElementById("identity-provider");
    btn.addEventListener("click", authenticationRequest);

}(document, JSON, helpers, XMLHttpRequest));