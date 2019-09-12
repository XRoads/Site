import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Modal from 'react-modal';
import ReadMoreAndLess from 'react-read-more-less';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ItemsCarousel from 'react-items-carousel';
import { userService } from '../../services';
import HorizontalNonLinearStepper from './HorizontalNonLinearStepper';
import facebookLogo from '../../assets/images/facebook.svg';
import linkedinLogo from '../../assets/images/linkedin.svg';
import twitterLogo from '../../assets/images/twitter.svg';
import githubLogo from '../../assets/images/github.svg';
import phoneLogo from '../../assets/images/phone.svg';
import mailLogo from '../../assets/images/mail.svg';
import addUser from '../../assets/images/add-user.svg';
import userLogo from '../../assets/images/user.svg';
import roleLogo from '../../assets/images/hand-shake.svg';
import addImage from '../../assets/images/add.svg';

Modal.setAppElement('#root');

const socialMediaIcons = [githubLogo, twitterLogo, facebookLogo, linkedinLogo, phoneLogo, mailLogo];

const avatarDimensions = { height: '190px', width: '190px' };
const socialMediaDimensions = { height: '30px', width: '30px' };
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default class Projects extends Component {
  constructor() {
    super();
    this.state = {
      activeMemberIndex: 0,
      activeRoleIndex: 0,
      modalIsOpen: false,
      profileData: null,
      isLoading: true,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    userService
      .getProfile(id)
      .then((response) => {
        if (response.token == 'invalid') {
          this.props.history.push('/signin');
        } else {
          this.setState({
            profileData: response.data,
            isLoading: false,
          });
        }
      })
      .catch((error) => {
        this.setState({ error, isLoading: false });
      });
  }

  openModal() {
    this.setState({ roleMail: 'ex@example.com', roleNum: '0021286854355' }, () => {
      this.setState({ modalIsOpen: true });
    });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  getCardsNum = (cardsType) => {
    if (window.innerWidth > 800) {
      if (cardsType === 0) {
        return 4;
      }
      return 3;
    }
    if (window.innerWidth < 800 && window.innerWidth > 400) {
      return 2;
    }
    return 1;
  };

  render() {
    if (this.state.isLoading) {
      return <div />;
    }
    const {
      description, team_name, stage, members, roles, profileLogo,
    } = this.state.profileData;

    return (
        <div className="col-sm-12 col-lg-8 col-md-10 margin-auto float-none">
            <Grid container justify="center" alignItems="center" direction="column">
                <Avatar alt="team logo" src={profileLogo || addImage} style={avatarDimensions} />
                <br />
                <Typography gutterBottom variant="headline" component="h2">
                    {team_name}
                </Typography>
                <ReadMoreAndLess
                    ref={this.ReadMore}
                    className="read-more-content"
                    charLimit={250}
                    readMoreText="Read more"
                    readLessText=""
                >
                    {description}
                </ReadMoreAndLess>
                <ul className="social-media-list">
                    {socialMediaIcons.map(icon => (
                        <li className="social-media-item" key={icon}>
                            <a href="/">
                                <Avatar src={icon} style={socialMediaDimensions} />
                            </a>
                        </li>
                    ))}
                </ul>
                <HorizontalNonLinearStepper currentStage={stage} profileData={this.state.profileData} />
                <div className="carousel">
                    <Typography gutterBottom variant="headline" component="h3">
              Members
                    </Typography>
                    <ItemsCarousel
                        gutter={12}
                        activePosition="center"
                        chevronWidth={60}
                        numberOfCards={this.getCardsNum(0)}
                        slidesToScroll={1}
                        outsideChevron
                        showSlither={false}
                        firstAndLastGutter={false}
                        activeItemIndex={this.state.activeMemberIndex}
                        requestToChangeActive={value => this.setState({ activeMemberIndex: value })}
                        rightChevron={<p className="card-controller">{'>'}</p>}
                        leftChevron={<p className="card-controller">{'<'}</p>}
                    >
                        {Array.from(new Array(members.length < 4 ? 5 : members.length + 1)).map((_, i) => (
                            <div className="card-wrapper">
                                <div
                                    className="card-image"
                                    style={{
                                      background: members[i] ? `url(${userLogo})` : `url(${addUser})`,
                                    }}
                                />
                                <p>{members[i] ? members[i].name : 'Add Member'}</p>
                            </div>
                        ))}
                    </ItemsCarousel>
                </div>

                <div className="carousel">
                    <Typography gutterBottom variant="headline" component="h3">
              Roles Available
                    </Typography>
                    <ItemsCarousel
                        gutter={12}
                        activePosition="center"
                        chevronWidth={60}
                        numberOfCards={this.getCardsNum(1)}
                        slidesToScroll={1}
                        outsideChevron
                        showSlither={false}
                        firstAndLastGutter={false}
                        activeItemIndex={this.state.activeRoleIndex}
                        requestToChangeActive={value => this.setState({ activeRoleIndex: value })}
                        rightChevron={<p className="card-controller">{'>'}</p>}
                        leftChevron={<p className="card-controller">{'<'}</p>}
                    >
                        {Array.from(new Array(roles.length < 3 ? 4 : roles.length + 1)).map((_, i) => (
                            <div className="card-wrapper card-wrapper-clickable" onClick={this.openModal}>
                                <div
                                    className="card-image"
                                    style={{
                                      background: roles[i] ? `url(${roleLogo})` : `url(${addUser})`,
                                    }}
                                />
                                <p>{roles[i] ? roles[i].name : 'Add Role'}</p>
                            </div>
                        ))}
                    </ItemsCarousel>
                </div>
            </Grid>
            <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Role Contacts"
            >
                <h5>Contacts</h5>
                <p>
            Email:
                    {this.state.roleMail}
                </p>
                <p>
            Number:
                    {this.state.roleNum}
                </p>
                <button type="button" onClick={this.closeModal} className="close-modal-button">
            close
                </button>
            </Modal>
        </div>
    );
  }
}
