import { useTheme, Box, Typography, IconButton } from '@mui/material'
import { shades } from '../../theme'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

const Footer = () => {
    const {
        palette: { neutral },
    } = useTheme()

    return (
        <Box mt='70px' p='40px 0' backgroundColor={neutral.light}>
            <Box
                width='80%'
                margin='auto'
                display='flex'
                justifyContent='space-between'
                flexWrap='wrap'
                rowGap='30px'
                columnGap='clamp(20px, 30px, 40px)'
            >
                <Box width='clamp(20%, 30%, 40%)'>
                    <Typography
                        variant='h4'
                        fontWeight='bold'
                        mb='30px'
                        color={shades.secondary[500]}
                    >
                        ECOMMER
                    </Typography>
                    <div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Dolore, illo ullam. Animi rerum fugit saepe hic
                        molestiae tenetur excepturi aperiam voluptatum, placeat.
                    </div>
                </Box>

                <Box>
                    <Typography varitant='h4' fontWeight='bold' mb='30px'>
                        ABOUT US
                    </Typography>
                    <Typography mb='30px'>Careers</Typography>
                    <Typography mb='30px'>Our Stores</Typography>
                    <Typography mb='30px'>Terms & Conditions</Typography>
                    <Typography mb='30px'>Privacy Policy</Typography>
                </Box>
                <Box>
                    <Typography varitant='h4' fontWeight='bold' mb='30px'>
                        CUSTOMER CARE
                    </Typography>
                    <Typography mb='30px'>Help Center</Typography>
                    <Typography mb='30px'>Track Your Order</Typography>
                    <Typography mb='30px'>
                        Corporate & Bulk Purchasing
                    </Typography>
                    <Typography mb='30px'>Returns & Refunds</Typography>
                </Box>
                <Box>
                    <Typography varitant='h4' fontWeight='bold' mb='30px'>
                        CONTACT US
                    </Typography>
                    <Typography mb='30px'>
                        18 almahdy streat, Talkha Almansoura
                    </Typography>
                    <Typography mb='30px'>
                        Email:{' '}
                        <a href='mailto:ahmedraed101@gmail.com'>
                            ahmedraed101@gmail.com
                        </a>
                    </Typography>
                    <Typography mb='30px'>
                        Phone: <a href='tel:+201273879101'>+201273879101</a>
                    </Typography>
                    <Typography mb='30px'>
                        <a
                            href='https://github.com/ahmedraed101'
                            target='_blank'
                            rel='noopener noreferrer'
                            style={{ textDecoration: 'none' }}
                        >
                            <IconButton sx={{ ':hover': { color: 'black' } }}>
                                <GitHubIcon
                                    color='black'
                                    sx={{ fontSize: '50px' }}
                                />
                            </IconButton>
                        </a>
                        <a
                            href='https://www.linkedin.com/in/ahmedraed101/'
                            target='_blank'
                            rel='noopener noreferrer'
                            style={{ textDecoration: 'none' }}
                        >
                            <IconButton sx={{ ':hover': { color: '#0072b1' } }}>
                                <LinkedInIcon
                                    color='black'
                                    sx={{
                                        fontSize: '50px',
                                    }}
                                />
                            </IconButton>
                        </a>
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default Footer
