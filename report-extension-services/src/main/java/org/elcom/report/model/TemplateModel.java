package org.elcom.report.model;

import juzu.Mapped;

import java.io.InputStream;
import java.io.Serializable;

@Mapped
public class TemplateModel implements Serializable {
    private static final long serialVersionUID = 1L;

    private String templateName = "";
    private String templateDescription = "";
    private InputStream templateFile = null;

    public String getTemplateName() {
        return templateName;
    }

    public void setTemplateName(String templateName) {
        this.templateName = templateName;
    }

    public String getTemplateDescription() {
        return templateDescription;
    }

    public void setTemplateDescription(String templateDescription) {
        this.templateDescription = templateDescription;
    }

    public InputStream getTemplateFile() {
        return templateFile;
    }

    public void setTemlateFile(InputStream templateFile) {
        this.templateFile = templateFile;
    }
}
