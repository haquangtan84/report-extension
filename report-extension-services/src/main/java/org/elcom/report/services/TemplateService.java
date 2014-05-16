package org.elcom.report.services;

import org.elcom.report.model.TemplateModel;
import org.exoplatform.commons.utils.CommonsUtils;
import org.exoplatform.services.cache.CacheService;
import org.exoplatform.services.cache.ExoCache;
import org.exoplatform.services.log.ExoLogger;
import org.exoplatform.services.log.Log;
import org.exoplatform.services.jcr.ext.common.SessionProvider;
import org.exoplatform.services.jcr.RepositoryService;

import javax.jcr.*;

import java.io.InputStream;
import java.io.Serializable;

public class TemplateService {
    protected static final String WORKSPACE_NAME = "collaboration";
    private static final Log LOG = ExoLogger.getLogger(TemplateService.class.getName());
    private static ExoCache<Serializable, TemplateModel> templateCache;
    public static String REPORT_TEMPLATE_KEY = "reportTemplate" + CommonsUtils.getRepository()
            .getConfiguration().getName();
    public static String BASE_PATH = "exo:applications";
    public static String REPORT_BASE_PATH = "interconnect-report";
    public static String TEMPLATE_BASE_PATH = "template";

    public static String VIDEOCALL_NODETYPE = "exo:TemplateReport";
    public static final String NT_UNSTRUCTURED = "nt:unstructured";
    public static String TEMPLATE_NAME_PROP ="exo:TemplateName";
    public static String TEMPLATE_DESCRIPTION_PROP ="exo:TemplateDescription";

    /**
     * Method constructor
     */
    public TemplateService() {
        templateCache = CommonsUtils.getService(CacheService.class).getCacheInstance(TemplateService.class.getName());
    }

    public void save(TemplateModel templateModel) {
        String templateName = templateModel.getTemplateName();
        String templateDescription = templateModel.getTemplateDescription();
        InputStream templateFile = templateModel.getTemplateFile();

        SessionProvider sessionProvider = null;
        try {
            sessionProvider = CommonsUtils.getUserSessionProvider();
            RepositoryService repositoryService = CommonsUtils.getService(RepositoryService.class);
            Session session = sessionProvider.getSession(WORKSPACE_NAME, repositoryService.getCurrentRepository());

            Node rootNode = session.getRootNode();
            Node baseNode = rootNode.getNode(BASE_PATH);

            Node reportBaseNode = null;
            if(baseNode.hasNode(REPORT_BASE_PATH)) {
                reportBaseNode = baseNode.getNode(REPORT_BASE_PATH);
            } else {
                reportBaseNode = baseNode.addNode(REPORT_BASE_PATH, NT_UNSTRUCTURED);
            }

            Node templateNode = null;
            if(reportBaseNode.hasNode(TEMPLATE_BASE_PATH)) {
                templateNode = reportBaseNode.getNode(TEMPLATE_BASE_PATH);
            } else {
                templateNode =
            }
        } catch (LoginException e) {
            e.printStackTrace();
            if (LOG.isErrorEnabled()) {
                //LOG.error("saveCustomer() failed because of ", e);
            }
        } catch (NoSuchWorkspaceException e) {
            e.printStackTrace();
            if (LOG.isErrorEnabled()) {
                //LOG.error("saveCustomer() failed because of ", e);
            }
        } catch (RepositoryException e) {
            e.printStackTrace();
            if (LOG.isErrorEnabled()) {
                //LOG.error("saveCustomer() failed because of ", e);
            }
        } catch (Exception e) {
            e.printStackTrace();
            if (LOG.isErrorEnabled()) {
                //LOG.error("saveCustomer() failed because of ", e);
            }
        }
    }

}
