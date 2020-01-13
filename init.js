// Initialize litegui.js
LiteGUI.init();

function createSettingsDialog() {
  // Create a new dialog
  var dialog = new LiteGUI.Dialog("Settings", {
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
  var widgets = new LiteGUI.Inspector();
  var nameWidget = widgets.addString("Your name", "foo");
  var ageWidget = widgets.addNumber("Your age", 35, { min: 0, max: 125 });

  dialog.add(widgets);

  // Placeholder function to show the new settings. Normally you would do something usefull here
  // with the new settings.
  function applySettings() {
    console.log(
      "Your name is " +
        nameWidget.getValue() +
        ", and you are " +
        ageWidget.getValue() +
        " years old"
    );
  }

  // Add some buttons
  dialog.addButton("Ok", { close: true, callback: applySettings });
  dialog.addButton("Apply", { close: false, callback: applySettings });
  dialog.addButton("Cancel", { close: "fade" });

  return dialog;
}

var settingsDialog = createSettingsDialog();

// dialogs are shown on creation, let's hide it until the settings menu item is clicked
settingsDialog.hide();

// Create a menu bar
var menu = new LiteGUI.Menubar();

// Add some items to it
menu.add("File/New");
menu.add("File/Settings", {
  callback: function() {
    settingsDialog.show("fade");
  }
});
// This will be shown greyed out
menu.add("File/I'm not clickable", { disabled: true });

// Add a second main menu item
menu.add("Help/Help");
menu.add("Help/About");

// Add the menu bar to litegui
LiteGUI.add(menu);
