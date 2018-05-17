$(function() {
        	var editorRichText;
	KindEditor.ready(function(K) {
        editorRichText = K.create("textarea[name='richText']",{
	        	syncType:'auto',//无效
	    		items:items,
	    		zIndex:99999999,
	    		uploadJson : adminContextPath + '/file/k_upload_image.do'
        });
	});
	var model = {
		path : adminContextPath + "/demo/gen",
		resetDataForm : function() {
			$("#data-form").bootstrapValidator('resetForm', true);
			//表单默认值可以在这里设置
			way.set("model.form.data",null);
		    	editorRichText.html('');
		},
		getFormData : function() {
			var data =  way.get("model.form.data");
			return data?data:{};
		},
		setFormTitle : function(title) {
			way.set("model.form.title", title);
		},
		tableRefresh : function() {
			$('#table').bootstrapTable("refresh");
		},
		setFormDataById:function(id){
			$.get(this.path + "/get.do",{id:id},function(respone){
				way.set("model.form.data",respone.data);
			    	editorRichText.html(respone.data.richText);
			})
		},
		setViewDataById:function(id){
			$.get(this.path + "/get.do",{id:id},function(respone){
				way.set("model.view",respone.data);
			})
		},
		init:function(){//需要初始化的功能
		}
	};
	model.init();
	// 校验
	$("#data-form").bootstrapValidator().on("success.form.bv", function(e) {// 提交
		e.preventDefault();
		 editorRichText.sync();
		 		if(!$("#inputDate").val()){
			layer.msg("日期不能为空");
			$('#data-form').bootstrapValidator('disableSubmitButtons', false);  
			return false;
		} 
		
		var id = model.getFormData().id;
		var optUrl = model.path + "/save.do";
		if (id) {
			optUrl = model.path + "/update.do";
		}
		$.post(optUrl, $("#data-form").serialize(), function(respone) {
			if (respone.responeCode == '0') {
				layer.msg("保存成功");
				model.tableRefresh();
				$("#form-panel").modal('toggle');
			}
		});
	});
	/**
	 * 查看
	 */
	$("body").on("click", ".view", function() {
		var id = $(this).data("id");
		model.setViewDataById(id);
		$('#modal-view').modal('toggle');
	});
	// 查询
	$("#search").click(function() {
		model.tableRefresh();
	});
	// 添加
	$("#add").click(function() {
		model.resetDataForm();
		model.setFormTitle("<i class='fa fa-plus'>添加</i>");
		$("#form-panel").modal('toggle');
	});
	// 编辑
	$("#edit").click(function() {
		var rows = $('#table').bootstrapTable("getSelections");
		if (rows.length == 0) {
			layer.msg("请选择一行");
		} else {
			model.resetDataForm();
			model.setFormDataById(rows[0].id);
			model.setFormTitle("<i class='fa fa-edit'>编辑</i>");
			$("#form-panel").modal('toggle');
		}
	});
	// 删除
	$("#delete").click(function() {
		var rows = $('#table').bootstrapTable("getSelections");
		if (rows.length == 0) {
			layer.msg("请选择一行");
		} else {
			layer.confirm('确定删除？', {
				shadeClose : true,
				icon : 3,
				anim : 6,
				btn : [ '确定', '取消' ]
			// 按钮
			}, function() {
				$.post(model.path  + "/delete.do", {
					id : rows[0].id
				}, function(respone) {
					if (respone.responeCode == "0") {
						layer.msg("删除成功");
						model.tableRefresh();
					} 
				});
			});
		}
	});
	// 列表
	$('#table').bootstrapTable({
		url : model.path + '/qryPage.do',
		columns : [ {
			checkbox : true
		}, 
			{
			field : 'inputText',
			title : '文本',
			sortName : 'input_text',
			sortable : true,
			order : 'desc',
			},
			{
			field : 'inputSelect',
			title : '下拉',
			sortName : 'input_select',
			sortable : true,
			order : 'desc',
			formatter : function(value, row, index) {
			    return $.getDictName('yes_no',value);
			 }
			},
			{
			field : 'inputRadio',
			title : '单选',
			sortName : 'input_radio',
			sortable : true,
			order : 'desc',
			formatter : function(value, row, index) {
			    return $.getDictName('yes_no',value);
			 }
			},
			{
			field : 'inputCheckbox',
			title : '复选',
			sortName : 'input_checkbox',
			sortable : true,
			order : 'desc',
			formatter : function(value, row, index) {
			    return $.getDictName('yes_no',value);
			 }
			},
			{
			field : 'inputTextarea',
			title : '文本域',
			},
			{
			field : 'inputDate',
			title : '日期',
			sortName : 'input_date',
			sortable : true,
			order : 'desc',
			},
			{
			field : 'inputZhengshu',
			title : '整数',
			sortName : 'input_zhengshu',
			sortable : true,
			order : 'desc',
			},
			{
			field : 'inputXiaoshu',
			title : '小数',
			sortName : 'input_xiaoshu',
			sortable : true,
			order : 'desc',
			},
			{
			field : 'richText',
			title : '富文本',
			},
			{
			field : 'image',
			title : '图片',
			},
			{
			field : 'file',
			title : '文件',
			},
			{
			field : 'updateDate',
			title : '更新时间',
			},
		 ]
	});
});