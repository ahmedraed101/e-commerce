import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material'
import AddressFrom from './AddressFrom'

const Shipping = ({
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldValue,
}) => {
    return (
        <Box m='30px auto'>
            <Box>
                <Typography sx={{ mb: '15px' }} fontSize='18px'>
                    Billing Information
                </Typography>
                <AddressFrom
                    type='billingAddress'
                    values={values.billingAddress}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                />
            </Box>
            <Box mb='20px'>
                <FormControlLabel
                    control={
                        <Checkbox
                            label='Same for Shipping Address'
                            defaultChecked
                            value={values.shippingAddress.isSameAddress}
                            onChange={() =>
                                setFieldValue(
                                    'shippingAddress.isSameAddress',
                                    !values.shippingAddress.isSameAddress
                                )
                            }
                        />
                    }
                />
            </Box>

            {/* Shipping  Form*/}
            {!values.shippingAddress.isSameAddress && (
                <Box>
                    <Typography sx={{ mb: '15px' }} fontSize='18px'>
                        Shipping Information
                    </Typography>
                    <AddressFrom
                        type='shippingAddress'
                        values={values.billingAddress}
                        errors={errors}
                        touched={touched}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                    />
                </Box>
            )}
        </Box>
    )
}

export default Shipping
