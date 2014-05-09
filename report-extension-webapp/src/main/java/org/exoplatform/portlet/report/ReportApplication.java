package org.exoplatform.portlet.report;


import juzu.request.RenderContext;
import juzu.template.Template;

import javax.inject.Inject;


public class ReportApplication {

    @Inject
    @Path("index.gtmpl")
    Template index;


    @Inject
    public ReportApplication() {

    }


    @View
    public void index(RenderContext renderContext) throws Exception {


        index.render();
    }
}
