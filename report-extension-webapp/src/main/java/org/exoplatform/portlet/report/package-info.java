@Application(defaultController = ReportApplication.class)
@Portlet(name = "ReportPortlet")


@Assets(
        location = AssetLocation.SERVER,
        scripts = {
                //@Script(src = "js/jquery-1.8.3.min.js", id = "jquery"),
        },
        stylesheets = {
                @Stylesheet(src = "css/style.css")
        }
)

package org.exoplatform.portlet.report;

import juzu.Application;
import juzu.asset.AssetLocation;
import juzu.plugin.asset.Assets;
import juzu.plugin.asset.Script;
import juzu.plugin.binding.Binding;
import juzu.plugin.binding.Bindings;
import juzu.plugin.portlet.Portlet;
import juzu.plugin.asset.Stylesheet;

