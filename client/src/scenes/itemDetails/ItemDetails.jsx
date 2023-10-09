import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { IconButton, Box, Typography, Button, Tab, Tabs } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import { shades } from '../../theme'
import { addToCart } from '../../state'
import { useParams, Link } from 'react-router-dom'
import Item from '../../components/Item'
import axios from 'axios'

const ItemDetails = () => {
    const dispatch = useDispatch()
    const { itemId } = useParams()
    const id = Number(itemId)
    const [value, setValue] = useState('description')
    const [favorit, setFavorit] = useState(false)
    const [count, setCount] = useState(1)
    const [item, setItem] = useState(null)
    const [items, setItems] = useState([])

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    async function getItem() {
        const response = await axios.get(
            `http://localhost:1337/api/items/${itemId}?populate=image`
        )
        setItem(response.data.data)
    }

    async function getItems() {
        const response = await axios.get(
            `http://localhost:1337/api/items?populate=image&pagination[start]=${Math.min(
                itemId,
                15
            )}&pagination[limit]=${5}`
        )
        console.log(response.data.data)
        setItems(response.data.data)
    }

    useEffect(() => {
        getItem()
        getItems()
    }, [itemId]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box width='80%' m='80px auto'>
            <Box display='flex' flexWrap='wrap' columnGap='40px'>
                {/* ImageSection */}
                <Box flex='1 1 40%' mb='40px'>
                    <img
                        src={`http://localhost:1337${item?.attributes.image.data.attributes.formats.medium.url}`}
                        alt={item?.attributes.name}
                        width='100%'
                        height='100%'
                    />
                </Box>

                {/* Actions */}
                <Box flex='1 1 50%' mb='40px'>
                    <Box display='flex' justifyContent='space-between'>
                        <Box>
                            <Link
                                to='/'
                                style={{
                                    textDecoration: 'none',
                                }}
                            >
                                <Box
                                    sx={{
                                        ':hover': {
                                            color: shades.secondary[500],
                                        },
                                    }}
                                >
                                    Home
                                </Box>
                            </Link>
                        </Box>
                        <Box display='flex' gap='30px'>
                            <Link
                                to={id === 1 ? '' : `/item/${id - 1}`}
                                disabled
                                style={{
                                    textDecoration: 'none',
                                }}
                            >
                                <Box
                                    sx={{
                                        color: id < 2 ? 'lightgray' : 'black',
                                        ':hover': {
                                            color:
                                                id > 1
                                                    ? shades.secondary[500]
                                                    : 'lightgray',
                                        },
                                    }}
                                >
                                    Prev
                                </Box>
                            </Link>
                            <Link
                                to={id === 20 ? '' : `/item/${id + 1}`}
                                style={{
                                    textDecoration: 'none',
                                }}
                            >
                                <Box
                                    sx={{
                                        color: id > 19 ? 'lightgray' : 'black',
                                        ':hover': {
                                            color:
                                                id < 20
                                                    ? shades.secondary[500]
                                                    : 'lightgray',
                                        },
                                    }}
                                >
                                    Next
                                </Box>
                            </Link>
                        </Box>
                    </Box>

                    <Box m='65px 0 25px 0'>
                        <Typography variant='h3'>
                            {item?.attributes?.name}
                        </Typography>
                        <Typography>${item?.attributes?.price}</Typography>
                        <Typography sx={{ mt: '20px' }}>
                            {item?.attributes?.longDescription}
                        </Typography>
                    </Box>

                    {/* Count and buttons */}
                    <Box
                        display='flex'
                        alignItems='center'
                        minHeight='50px'
                        justifyContent='space-between'
                    >
                        <Box
                            display='flex'
                            alignItems='center'
                            border={`1.5px solid ${shades.neutral[300]}`}
                            mr='20px'
                            p='2px 5px'
                        >
                            {/* Amount */}
                            <IconButton
                                onClick={() => setCount(Math.max(count - 1, 1))}
                            >
                                <RemoveIcon />
                            </IconButton>
                            <Typography sx={{ p: '0 5px' }}>{count}</Typography>
                            <IconButton
                                onClick={() =>
                                    setCount((prevCount) => prevCount + 1)
                                }
                            >
                                <AddIcon />
                            </IconButton>
                        </Box>
                        <Button
                            sx={{
                                backgroundColor: '#222222',
                                color: 'white',
                                borderRadius: 0,
                                minWidth: '15px',
                                padding: '10px 40px',
                            }}
                            onClick={() =>
                                dispatch(
                                    addToCart({ item: { ...item, count } })
                                )
                            }
                        >
                            Add To Cart
                        </Button>
                    </Box>
                    <Box>
                        <Box m='20px 0 5px 0' display='flex'>
                            <IconButton onClick={() => setFavorit(!favorit)}>
                                <FavoriteBorderOutlinedIcon
                                    sx={{
                                        color: favorit
                                            ? shades.secondary[500]
                                            : undefined,
                                        cursor: 'pointer',
                                    }}
                                />
                            </IconButton>
                            <Typography sx={{ m: '7px 0 0 5px' }}>
                                ADD TO WISHLIST
                            </Typography>
                        </Box>
                        <Typography m='20px 0 0 10px'>
                            CATEGORY: {item?.attributes?.category}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* INFORMATION */}
            <Box m='20px 0'>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label='description' value='description'></Tab>
                    <Tab label='Reviews' value='reviews'></Tab>
                </Tabs>
            </Box>
            <Box display='flex' flexWrap='wrap' gap='15px'>
                {value === 'description' && (
                    <div>{item?.attributes?.longDescription}</div>
                )}
                {value === 'reviews' && (
                    <div>
                        <h4>Reviews</h4>
                    </div>
                )}
            </Box>

            {/* Realated items */}
            <Box mt='50px' width='100%'>
                <Typography variant='h3' fontWeight='bold'>
                    Related Products
                </Typography>
                <Box
                    mt='20px'
                    display='flex'
                    flexWrap='wrap'
                    // columnGap='1.33%'
                    // rowGap='30px'
                    gap='30px'
                    justifyContent='space-between'
                    alignItems='center'
                >
                    {items
                        .filter((item) => item.id !== id)
                        .map((item) => (
                            <Item item={item} key={item.id} />
                        ))}
                </Box>
            </Box>
        </Box>
    )
}

export default ItemDetails
