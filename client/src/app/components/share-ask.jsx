var React = require('react');
var Router = require('react-router');
var mui = require('material-ui');
var { FlatButton,
  Dialog,
  TextField,
  IconButton,
  RaisedButton,
  Snackbar } = mui;
var Colors = mui.Styles.Colors;

var Share = require('./svg-icons/share.jsx');

var ShareAsk = React.createClass({
  getInitialState: function() {
    return {
      dialOpen : false,
      result : '',
    };
  },

  render: function() {
    var styles = {
      iconButton: {
        marginRight: 10,
        marginBottom: 10,
        float: "right"
      },
      dialCont: {
        width: '160px',
      },
      dialBody:{
        backgroundColor: "#ECEFF1",
        padding: '15px'
      },
      shareBt: {
        width: '100%',
        height: '40px',
        padding: '5px',
      },
      logo: {
        float: 'left',
        width: '30px'
      },
      fontSt:{
        float: 'left',
        marginLeft: 5,
      }
    };

    const actions = [
      <FlatButton
        label="Cancle"
        keyboardFocused={true}
        onTouchTap={this._onClose} />,
    ];

    return (
      <div>
        <IconButton style={styles.iconButton} onTouchTap={this.handleShareButtonTouchTap} >
          <Share />
        </IconButton>
        <Dialog
          bodyStyle={styles.dialBody}
          contentStyle={styles.dialCont}
          actions={actions}
          modal={false}
          open={this.state.dialOpen}
          onRequestClose={this._onClose}>
          <FlatButton
            style={styles.shareBt}
            onTouchTap={this._kakaotalkShare} >
            <img src="img/kakaoIcon.png" style={styles.logo}/>
            <div style={styles.fontSt}>Kakaotalk</div>
          </FlatButton>
          <FlatButton
            style={styles.shareBt}
            onTouchTap={this._share} >
            <img src="img/facebook-box.png" style={styles.logo}/>
            <div style={styles.fontSt}>Facebook</div>
          </FlatButton>
          <FlatButton
            style={styles.shareBt}
            onTouchTap={this._share} >
            <img src="img/paperclip.png" style={styles.logo}/>
            <div style={styles.fontSt}>Copy URL</div>
          </FlatButton>
        </Dialog>
	<Snackbar
	  ref="snackbar"
	  message={this.state.result} />
      </div>
    );
  },

  _kakaotalkShare: function() {
    Kakao.Link.createTalkButton({
      label: 'What is your choice?',
      image: {
        src: 'http://askus.me/img/askus.png',
	width: '300',
	height: '200'
      },
      webButton: {
        text: 'Go to vote!',
	url: 'http://localhost:3000/#/ask-by-index?index=' + this.props.shareIndex,
        //TODO : enable askus url after applying to master
	//url: 'http://askus.me/#/ask-by-index?index=' + this.props.shareIndex,
      },
      //TODO: add marketParams after release Native App
      fail: {
        function() {
          console.log('not supported platform');
          this.setState({result: "not supported device"});
          this.refs.snackbar.show();
	}
      }
    });
  },

  _facebookShare: function() {
    /* TO DO
     * Make URL and share to Facebook */
  },

  _share: function(e) {
    e.originalEvent.dataTransfer.setData("Text", 'http://localhost:3000/#/ask-by-index?index=' + this.props.shareIndex);
    //TODO : enable askus url after applying to master
    //window.clipboardData.setData("Text", 'http://askus.me/#/ask-by-index?index=' + this.props.shareIndex);
    this.setState({result: "success copy this ask's url"});
    this.refs.snackbar.show();
  },

  _onClose: function() {
    this.setState({dialOpen: false});
  },

  handleShareButtonTouchTap: function() {
    this.setState({dialOpen: true});
  },
});

ShareAsk.contextTypes = {
  router: React.PropTypes.func
};

module.exports = ShareAsk;
