function wellCreator(name, imgURL) {
  return '<div class="well col-md-3">\
            <h3 class="text-primary"><span class="fa fa-github"></span> Github</h3>\
            <strong>name</strong>:' + name + '<br>\
            <img class="profpic" src="' + imgURL + '"><br>\
            <video id="localVideo" oncontextmenu="return false;"></video>\
            <div id="localVolume" class="volume_bar"></div>\
          </div>';
}