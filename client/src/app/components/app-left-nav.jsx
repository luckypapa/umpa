var React = require('react');
var Router = require('react-router');
var mui = require('material-ui');
var {MenuItem, LeftNav, List, ListItem, Avatar, IconButton} = mui;
var {Colors, Spacing, Typography} = mui.Styles;

var ActionAssignment = require('./svg-icons/action-assignment.jsx');
var ActionGrade = require('./svg-icons/action-grade.jsx');
var ActionInfo = require('./svg-icons/action-info.jsx');
var CommunicationCall = require('./svg-icons/communication-call.jsx');
var CommunicationChatBubble = require('./svg-icons/communication-chat-bubble.jsx');
var CommunicationEmail = require('./svg-icons/communication-email.jsx');
var ContentDrafts = require('./svg-icons/content-drafts.jsx');
var ContentInbox = require('./svg-icons/content-inbox.jsx');
var ContentSend = require('./svg-icons/content-send.jsx');
var EditorInsertChart = require('./svg-icons/editor-insert-chart.jsx');
var FileFolder = require('./svg-icons/file-folder.jsx');
var ToggleStarBorder = require('./svg-icons/toggle-star-border.jsx');
var NavigationMoreButton = require('./svg-icons/navigation-more-button.jsx');

var menuItems = [
    { route: 'my-asks', text: 'My Asks' },
    { route: 'voted-asks', text: 'Voted Asks' },
    { type: MenuItem.Types.SUBHEADER , text: 'Setting' },
    { route: 'profile', text: 'Profile' },
    { route: 'logout', text: 'Logout' },
  ];

class AppLeftNav extends React.Component {

  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this._getSelectedIndex = this._getSelectedIndex.bind(this);
    this._onLeftNavChange = this._onLeftNavChange.bind(this);
    this._onHeaderClick = this._onHeaderClick.bind(this);
  }

  getStyles() {
    return {
      ListHead: {
        backgroundColor: Colors.grey300
      }
    }
  }

  getInitialState() {
    return {
      user : document.user,
    };
  }

  componentWillMount() {
    console.log('AppLeftNav componentWillMount called');
  }

  componentDidMount() {
    document.addEventListener("fbUserInfo",
      function statusChangeCallback(e) {
        this.setState({user: document.user});
      }.bind(this)
    );
  }

  componentWillUpdate() {
    console.log('AppLeftNav componentWillUpdate called');
  }

  render() {
    var profile_photo = document.user === undefined ? "" : "http://graph.facebook.com/"+document.user.id+"/picture?type=small";
    var header = (
      <div onTouchTap={this._onHeaderClick}>
        <List style={this.getStyles().ListHead}>
          <ListItem
            leftAvatar={ document.user === undefined ? <Avatar>A</Avatar> : <Avatar src={profile_photo}>A</Avatar>}
            primaryText={document.user === undefined ? "" : document.user.name}
            secondaryText={document.user === undefined ? "" : document.user.email}
          >
          </ListItem>
        </List>

      </div>
    );

    return (
      <LeftNav 
        ref="leftNav"
        docked={false}
        isInitiallyOpen={false}
        disableSwipeToOpen={true}
        header={header}
        menuItems={menuItems}
        selectedIndex={this._getSelectedIndex()}
        openRight={true}
        onChange={this._onLeftNavChange} />
    );
  }

  toggle() {
    this.refs.leftNav.toggle();
  }

  _getSelectedIndex() {
    var currentItem;

    for (var i = menuItems.length - 1; i >= 0; i--) {
      currentItem = menuItems[i];
      if (currentItem.route && this.context.router.isActive(currentItem.route)) return i;
    }
  }

  _onLeftNavChange(e, key, payload) {
    console.log("_onLeftNavChange e : " + e);
    console.log("_onLeftNavChange key : " + key);
    console.log("_onLeftNavChange payload : " + payload);

    if (payload.text === "Logout") {
      console.log('FB Logout Click');
      FB.logout(function(response) {
        console.log(response);
      }.bind(this));
    }
  }

  _onHeaderClick() {
    this.refs.leftNav.close();
  }
}

AppLeftNav.contextTypes = {
  router: React.PropTypes.func
};

module.exports = AppLeftNav;