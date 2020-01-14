class Jackpot_MenuBar extends LiteGUI.Menubar{
    constructor(id, options){
        super(id, options);
        this._init();
    }

    _init(){
        let settingsDialog = this._createSettingsDialog();
        settingsDialog.hide();

        this.add("File/New");
        this.add("File/Settings", {
            callback: function() {
                settingsDialog.show("fade");
            }
        });
        this.add("File/I'm not clickable", { disabled: true });
        this.add("Help/Help");
        this.add("Help/About");
    }

    _createSettingsDialog() {
        // Create a new dialog
        let dialog = new Jackpot_Dialog("Settings", {
            title: "Project Settings",
            close: true,
            minimize: false,
            width: 300,
            height: 500,
            scroll: false,
            resizable: false,
            draggable: true
        });

        // Create a collection of widgets
        var widgets = new Jackpot_Inspector();
        var nameWidget = widgets.addString("Your name", "foo");
        var ageWidget = widgets.addNumber("Your age", 35, { min: 0, max: 125 });

        dialog.add(widgets);

        // Placeholder function to show the new settings. Normally you would do something usefull here
        // with the new settings.

        let applySettingsCallback = () => {
            console.log(
                "Your name is " +
                nameWidget.getValue() +
                ", and you are " +
                ageWidget.getValue() +
                " years old"
            );
        };

        // Add some buttons
        dialog.addButton("Ok", { close: true, callback: applySettingsCallback() });
        dialog.addButton("Apply", { close: false, callback: applySettingsCallback() });
        dialog.addButton("Cancel", { close: "fade" });

        return dialog;
    }
}