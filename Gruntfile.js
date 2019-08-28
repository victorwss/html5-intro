var VENDOR_CSS = [
    "libs/jquery-ui.css",
    "libs/jquery.maxlength.css",
    "libs/ui.jqgrid.css",
    "libs/jquery.validationEngine.css",
],
VENDOR_LIBS = [
    "libs/jquery.js",
    "libs/jquery.migrate.js",
    "libs/jquery.blockUI.js",
    "libs/grid.locale-en.js",
    "libs/grid.locale-pt-br.js",
    "libs/jquery.jqgrid.src.js",
    "libs/jquery-ui.js",
    "libs/jqueryui.datepicker-pt-BR.js",
    "libs/jquery.mask.js",
    "libs/jquery.plugin.js",
    "libs/jquery.maxlength.js",
    "libs/jquery.validationEngine.js",
    "libs/jquery.validationEngine-pt_BR.js",
    "libs/jquery.validate.js",
    "libs/jquery.validate.additional-methods.js",
    "libs/jquery.validate.pt_BR.js"
],
DEPRECATED = [
    "src/deprecated/jsusp-format.js",
    "src/deprecated/utils/util.js",
    "src/deprecated/input/uspInput.js",
    "src/deprecated/input/uspCampoProcesso.js",
    "src/deprecated/input/uspBooleanCheckbox.js",
    "src/deprecated/input/uspDatepicker.js",
    "src/deprecated/input/uspDatetimepicker.js",
    "src/deprecated/input/uspMaxlength.js",
    "src/deprecated/input/uspMask.js",
    "src/deprecated/input/uspNumber.js",
    "src/deprecated/input/uspRadio.js",
    "src/deprecated/input/uspTimepicker.js",
    "src/deprecated/input/uspEditor.js",
    "src/deprecated/tabs/uspTabsBase.js",
    "src/deprecated/tabs/uspTabsAjax.js",
    "src/deprecated/tabs/uspTabsCrud.js",
    "src/deprecated/tabs/uspTabs.js",
    "src/deprecated/form/uspFormBase.js",
    "src/deprecated/form/uspForm.js",
    "src/deprecated/dialog/uspDialogBase.js",
    "src/deprecated/dialog/uspDialogCrud.js",
    "src/deprecated/dialog/uspDialog.js",
    "src/deprecated/grid/uspGridBase.js",
    "src/deprecated/grid/uspGridCrud.js",
    "src/deprecated/grid/uspGrid.js",
    "src/deprecated/select/uspSelectBase.js",
    "src/deprecated/select/uspSelect.js",
    "src/deprecated/component/uspComponent.js",
    "src/deprecated/busca/uspVinculo.js"
];

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        jshint: {
			gruntfile:{
				src: [ "Gruntfile.js" ]
			},
			build: {
				src: [ "src/js/**/*.js", "test/**/*.js" ],
			},
        },
        jasmine: {
			test: {
				src: "src/js/**/*.js",
				options: {
                    display: 'short',
                    host: "http://localhost:9002/",
					helpers: "helper/*.js",
                    specs: "spec/**/*.js"
				}
			},
        },
        connect: {
            options: {
                keepalive: false,
            },
            test: {
				options: {
                    port: 9002
				}
			}
        }
    });

    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-jasmine");
    
    grunt.registerTask("test", ['connect', 'jasmine']);
};