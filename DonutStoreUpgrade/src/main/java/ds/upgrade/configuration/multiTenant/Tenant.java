package ds.upgrade.configuration.multiTenant;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

public class Tenant implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 7886318016422987424L;
	
	private String apiCode;
	private String templateCode;
	private Long cartExpiration;
	private String organizationName;
	private Long organizationId;
	private String preferLanguage;
	private Boolean mobileResponsive;
	private String defaultRedirect;
	private String defaultCallingCode;
	private String defaultCountryCode;
	private String defaultIdType;
	private String newsletterType;
	private boolean transactionFilterOwnShow;
	private boolean whiteLabel;
	private Map<String, String> authentication = new HashMap<>();
	
	
	public String getApiCode() {
		return apiCode;
	}
	public void setApiCode(String apiCode) {
		this.apiCode = apiCode;
	}
	public String getTemplateCode() {
		return templateCode;
	}
	public void setTemplateCode(String templateCode) {
		this.templateCode = templateCode;
	}
	public Long getCartExpiration() {
		return cartExpiration;
	}
	public void setCartExpiration(Long cartExpiration) {
		this.cartExpiration = cartExpiration;
	}
	public String getOrganizationName() {
		return organizationName;
	}
	public void setOrganizationName(String organizationName) {
		this.organizationName = organizationName;
	}
	public Long getOrganizationId() {
		return organizationId;
	}
	public void setOrganizationId(Long organizationId) {
		this.organizationId = organizationId;
	}
	public String getPreferLanguage() {
		return preferLanguage;
	}
	public void setPreferLanguage(String preferLanguage) {
		this.preferLanguage = preferLanguage;
	}
	public Boolean getMobileResponsive() {
		return mobileResponsive;
	}
	public void setMobileResponsive(Boolean mobileResponsive) {
		this.mobileResponsive = mobileResponsive;
	}
	public String getDefaultRedirect() {
		return defaultRedirect;
	}
	public void setDefaultRedirect(String defaultRedirect) {
		this.defaultRedirect = defaultRedirect;
	}
	public String getDefaultCallingCode() {
		return defaultCallingCode;
	}
	public void setDefaultCallingCode(String defaultCallingCode) {
		this.defaultCallingCode = defaultCallingCode;
	}
	public String getDefaultCountryCode() {
		return defaultCountryCode;
	}
	public void setDefaultCountryCode(String defaultCountryCode) {
		this.defaultCountryCode = defaultCountryCode;
	}
	public String getDefaultIdType() {
		return defaultIdType;
	}
	public void setDefaultIdType(String defaultIdType) {
		this.defaultIdType = defaultIdType;
	}
	public String getNewsletterType() {
		return newsletterType;
	}
	public void setNewsletterType(String newsletterType) {
		this.newsletterType = newsletterType;
	}
	public boolean isWhiteLabel() {
		return whiteLabel;
	}
	public void setWhiteLabel(boolean WhiteLabel) {
		this.whiteLabel = WhiteLabel;
	}
	public boolean isTransactionFilterOwnShow() {
		return transactionFilterOwnShow;
	}
	public void setTransactionFilterOwnShow(boolean transactionFilterOwnShow) {
		this.transactionFilterOwnShow = transactionFilterOwnShow;
	}
	public Map<String, String> getAuthentication() {
		return authentication;
	}
	public void setAuthentication(Map<String, String> authentication) {
		this.authentication = authentication;
	}
	
}
