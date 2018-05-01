package com.seezoon.framework.modules.system.entity;

import java.util.List;

import com.alibaba.fastjson.annotation.JSONField;
import com.seezoon.framework.common.entity.BaseEntity;
import com.seezoon.framework.modules.system.dto.GenColumnInfo;

/**
 * 代码生成类
 * @author hdf
 * 2018年4月26日
 */
public class SysGen extends BaseEntity<String>{

	/**
	 * 表名
	 */
	private String tableName;

	/**
	 * 菜单名
	 */
	private String menuName;

	/**
	 * 模块名
	 */
	private String moduleName;

	/**
	 * 生成模板
	 */
	private String template;

	/**
	 * 类名
	 */
	private String className;

	/**
	 * 字段信息JSON
	 */
	@JSONField(serialize=false)
	private String columns;

	/**
	 * 生成列信息
	 */
	private List<GenColumnInfo> columnInfo;
	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName == null ? null : tableName.trim();
	}

	public String getMenuName() {
		return menuName;
	}

	public void setMenuName(String menuName) {
		this.menuName = menuName == null ? null : menuName.trim();
	}

	public String getModuleName() {
		return moduleName;
	}

	public void setModuleName(String moduleName) {
		this.moduleName = moduleName == null ? null : moduleName.trim();
	}

	public String getTemplate() {
		return template;
	}

	public void setTemplate(String template) {
		this.template = template == null ? null : template.trim();
	}

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className == null ? null : className.trim();
	}

	public String getColumns() {
		return columns;
	}

	public void setColumns(String columns) {
		this.columns = columns == null ? null : columns.trim();
	}

	public List<GenColumnInfo> getColumnInfo() {
		return columnInfo;
	}

	public void setColumnInfo(List<GenColumnInfo> columnInfo) {
		this.columnInfo = columnInfo;
	}
	
}