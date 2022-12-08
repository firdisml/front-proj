import { useEffect } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from '@mui/material'
import { ChartBar as ChartBarIcon } from '../icons/chart-bar'
import { Selector as SelectorIcon } from '../icons/selector'
import { Cog as CogIcon } from '../icons/cog'
import { Threshold as ThresholdIcon } from '../icons/threshold'
import { Logo } from './logo'
import { NavItem } from './nav-item'
// import SummarizeIcon from '@mui/icons-material/Summarize';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import PaidIcon from '@mui/icons-material/Paid';
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import FeedbackIcon from '@mui/icons-material/Feedback';
import SummarizeIcon from '@mui/icons-material/Summarize';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SchoolIcon from '@mui/icons-material/School';

const items = [
  {
    href: '/childs',
    icon: (<EscalatorWarningIcon fontSize="small" />),
    title: 'Child List',
    role: ['Parent'],
  },
  {
    href: '/student',
    icon: (<EscalatorWarningIcon fontSize="small" />),
    title: 'Student List',
    role: ['Tutor'],
  },
  {
    href: '/tutors',
    icon: (<SchoolIcon fontSize="small" />),
    title: 'Tutors',
    role: ['Parent'],
  },
  {
    href: '/timetable',
    icon: (<EventIcon fontSize="small" />),
    title: 'Timetable',
    role: ['Parent', 'Tutor', 'Child'],
  },
 
  {
    href: '/users',
    icon: (<GroupIcon fontSize="small" />),
    title: 'User Management',
    role: ['Admin'],
  },
  {
    href: '/payment',
    icon: (<PaidIcon fontSize="small" />),
    title: 'Payment Management',
    role: ['Admin', 'Parent', 'Tutor'],
  },
  {
    href: '/report',
    icon: (<SummarizeIcon fontSize="small" />),
    title: 'Child Report Card',
    role: ['Parent','Child'],
  },
  {
    href: '/feedback',
    icon: (<FeedbackIcon fontSize="small" />),
    title: 'Feeback',
    role: ['Parent', 'Tutor'],
  },
  {
    href: '/viewfeedback',
    icon: (<FeedbackIcon fontSize="small" />),
    title: 'Feebacks',
    role: ['Admin'],
  },
  {
    href: '/account',
    icon: (<ManageAccountsIcon fontSize="small" />),
    title: 'Account',
    role: ['Parent', 'Tutor','Child'],
  },

  {
    href: '/chat',
    icon: (<QuestionAnswerIcon fontSize="small" />),
    title: 'Message',
    role: ['Parent', 'Tutor', 'Child'],
  },
  {
    href: '/usersTimetable',
    icon: (<EventIcon fontSize="small" />),
    title: 'Timetable',
    role: ['Admin'],
  },

];

export const DashboardSidebar = (props) => {
  const { open, onClose, type } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

  function getFilered(e) {
    let arr = []
    e.forEach(a1 => {
      if (a1['role'].includes(type)) {
        arr.push(a1)
      }
    })

    return arr

  }

  const filteredItems = getFilered(items)

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }
      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );
  // #08143c
  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          backgroundColor: '#80bdec',
        }}
      >
        <div>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center" sx={{
              // width: '100%',
              p: 3,
            }}>
            {/* <NextLink
              href="/"
              passHref
            > */}

            <img
              style={{
                borderRadius: 4,
              }}
              src={`/static/logo3.png`}
              width={120}
              height={90}
              // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              // alt={item.title}
              loading="lazy"
            />

            {/* </NextLink> */}
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                px: 3,
                py: '11px',
                borderRadius: 1
              }}
            >
               {/* #08143c
        #0063B2FF */}
              <div>
                <Typography
                  // color="inherit"
                  variant="subtitle1"
                  color='#08143c'
                >
                  A+Class Home Tuition
                </Typography>
                <Typography
                  color="#0063B2FF"
                  variant="body2"
                >
                  Your role
                  {' '}
                  : {type}
                </Typography>
              </div>
              <SelectorIcon
                sx={{
                  color: 'neutral.500',
                  width: 14,
                  height: 14
                }}
              />
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {filteredItems.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: '#2D3748' }} />

      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: '#80bdec',
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: '#80bdec',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {

  onClose: PropTypes.func,
  open: PropTypes.bool

};
