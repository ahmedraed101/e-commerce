import { Box, Typography, IconButton, useMediaQuery } from '@mui/material'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { shades } from '../../theme'
import ImageOne from '../../assets/one.jpg'
import ImageTwo from '../../assets/two.jpg'
import ImageThree from '../../assets/three.jpg'
import ImageFour from '../../assets/four.jpg'
import ImageFive from '../../assets/five.jpg'
// import { Label } from '@mui/icons-material'

const Images = [ImageOne, ImageTwo, ImageThree, ImageFour, ImageFive]

const MainCarousel = () => {
    const isNonMobil = useMediaQuery('(min-width: 600px)')

    return (
        <Carousel
            infiniteLoop={true}
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
            renderArrowPrev={(onClickHanler, hasPrev, label) => (
                <IconButton
                    onClick={onClickHanler}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '0',
                        color: 'white',
                        padding: '5px',
                        zIndex: '10',
                    }}
                >
                    <NavigateBeforeIcon sx={{ fontSize: 40 }} />
                </IconButton>
            )}
            renderArrowNext={(onClickHanler, hasNext, label) => (
                <IconButton
                    onClick={onClickHanler}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        right: '0',
                        color: 'white',
                        padding: '5px',
                        zIndex: '10',
                    }}
                >
                    <NavigateNextIcon sx={{ fontSize: 40 }} />
                </IconButton>
            )}
        >
            {Images.map((image, index) => (
                <Box key={index}>
                    <img
                        src={image}
                        alt='carousel-image'
                        style={{
                            width: '100%',
                            height: '700px',
                            objectFit: 'cover',
                            backgroundAttachment: 'fixed',
                        }}
                    />
                    <Box
                        color='white'
                        padding='20px'
                        borderRadius='1px'
                        textAlign='left'
                        backgroundColor='rgba(0,0,0,0.4)'
                        position='absolute'
                        top='46%'
                        left={isNonMobil ? '10%' : '0'}
                        right={isNonMobil ? undefined : '0'}
                        margin={isNonMobil ? undefined : '0 auto'}
                        maxWidth={isNonMobil ? undefined : '240px'}
                    >
                        <Typography color={shades.secondary[200]}>
                            -- New Items
                        </Typography>
                        <Typography variant='h1'>Summer Sale</Typography>
                        <Typography
                            fontWeight='bold'
                            color={shades.secondary[300]}
                            sx={{ testDecoration: 'underline' }}
                        >
                            Discover More
                        </Typography>
                    </Box>
                </Box>
            ))}
        </Carousel>
    )
}

export default MainCarousel
