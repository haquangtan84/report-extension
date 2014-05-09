package org.exoplatform.portlet.report;


import juzu.request.RenderContext;
import juzu.template.Template;
import juzu.*;
import juzu.request.HttpContext;
import juzu.request.RenderContext;
import juzu.template.Template;
import javax.inject.Inject;
import javax.inject.Provider;
import javax.servlet.http.HttpSession;
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
