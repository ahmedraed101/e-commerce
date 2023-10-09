import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Tab, Tabs, Box, Typography, useMediaQuery } from '@mui/material'
import Item from '../../components/Item'
import { setItems } from '../../state'
import axios from 'axios'

const ShoppingList = () => {
    const dispatch = useDispatch()
    const [value, setValue] = useState('all')
    const items = useSelector((state) => state.cart.items)
    const isNonMobil = useMediaQuery('(min-width:600px)')

    const handleChange = (event, newValue) => setValue(newValue)

    async function getItems() {
        try {
            const response = await axios.get(
                'http://localhost:1337/api/items?populate=*'
            )
            dispatch(setItems(response.data.data))
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getItems()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const topRatedItems = items.filter(
        (item) => item.attributes.category === 'topRated'
    )
    const bestSellersItems = items.filter(
        (item) => item.attributes.category === 'bestSellers'
    )
    const newArrivalsItems = items.filter(
        (item) => item.attributes.category === 'newArrivals'
    )

    return (
        <Box width='80%' margin='80px auto'>
            <Typography variant='h3' textAlign='center'>
                Our Featured <b>Products</b>
            </Typography>
            <Tabs
                textColor='primary'
                indicatorColor='primary'
                value={value}
                onChange={handleChange}
                centered
                TabIndicatorProps={{
                    sx: { display: isNonMobil ? 'block' : 'none' },
                }}
                sx={{
                    m: '25px',
                    '& .MuiTabs-flexContainer': {
                        flexWrap: 'wrap',
                    },
                }}
            >
                <Tab label='ALL' value='all'></Tab>
                <Tab label='New Arrivals' value='newArrivals'></Tab>
                <Tab label='Best Sellers' value='bestSellers'></Tab>
                <Tab label='Top Rated' value='topRated'></Tab>
            </Tabs>
            <Box
                margin='0 auto'
                display='grid'
                gridTemplateColumns='repeat(auto-fill, 300px)'
                justifyContent='space-around'
                rowGap='20px'
                columnGap='1.33%'
            >
                {value === 'all' &&
                    items.map((item) => (
                        <Item
                            item={item}
                            key={`${item.id}`}
                            width='300px'
                        ></Item>
                    ))}
                {value === 'newArrivals' &&
                    newArrivalsItems.map((item) => (
                        <Item
                            item={item}
                            key={`${item.id}`}
                            width='300px'
                        ></Item>
                    ))}
                {value === 'bestSellers' &&
                    bestSellersItems.map((item) => (
                        <Item
                            item={item}
                            key={`${item.id}`}
                            width='300px'
                        ></Item>
                    ))}
                {value === 'topRated' &&
                    topRatedItems.map((item) => (
                        <Item
                            item={item}
                            key={`${item.id}`}
                            width='300px'
                        ></Item>
                    ))}
            </Box>
        </Box>
    )
}

export default ShoppingList
