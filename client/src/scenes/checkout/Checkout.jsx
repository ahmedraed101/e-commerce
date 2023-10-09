import { useSelector } from 'react-redux'
import { Box, Button, Stepper, Step, StepLabel } from '@mui/material'
import { Formik } from 'formik'
import { useState } from 'react'
import * as yup from 'yup'
import Shipping from './Shipping'
import Payment from './Payment'
import { shades } from '../../theme'

const initialValues = {
    billingAddress: {
        firstName: '',
        lastName: '',
        country: '',
        street1: '',
        street2: '',
        city: '',
        state: '',
        zipCode: '',
    },
    shippingAddress: {
        isSameAddress: true,
        firstName: '',
        lastName: '',
        country: '',
        street1: '',
        street2: '',
        city: '',
        state: '',
        zipCode: '',
    },
    email: '',
    phoneNumber: '',
}

const chekcoutSchema = [
    yup.object().shape({
        billingAddress: yup.object().shape({
            firstName: yup.string().required('Required'),
            lastName: yup.string().required('Required'),
            country: yup.string().required('Required'),
            street1: yup.string().required('Required'),
            street2: yup.string(),
            city: yup.string().required('Required'),
            state: yup.string().required('Required'),
            zipCode: yup.string().required('Required'),
        }),
        shippingAddress: yup.object().shape({
            isSameAddress: yup.boolean(),
            firstName: yup.string().when('isSameAddress', {
                is: false,
                then: () => yup.string().required('Required'),
            }),
            lastName: yup.string().when('isSameAddress', {
                is: false,
                then: () => yup.string().required('Required'),
            }),
            country: yup.string().when('isSameAddress', {
                is: false,
                then: () => yup.string().required('Required'),
            }),
            street1: yup.string().when('isSameAddress', {
                is: false,
                then: () => yup.string().required('Required'),
            }),
            street2: yup.string(),
            city: yup.string().when('isSameAddress', {
                is: false,
                then: () => yup.string().required('Required'),
            }),
            state: yup.string().when('isSameAddress', {
                is: false,
                then: () => yup.string().required('Required'),
            }),
            zipCode: yup.string().when('isSameAddress', {
                is: false,
                then: () => yup.string().required('Required'),
            }),
        }),
    }),
    yup.object().shape({
        email: yup.string().required('Required'),
        phoneNumber: yup.string().required('Required'),
    }),
]

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0)
    const cart = useSelector((state) => state.cart.cart)
    const isFirstStep = activeStep === 0
    const isSecondStep = activeStep === 1

    const handleFormSubmit = async (values, actions) => {
        setActiveStep(activeStep + 1)

        // copies the billing address onto shipping address
        if (isFirstStep && values.shippingAddress.isSameAddress) {
            actions.setFieldValue('shippingAddress', {
                ...values.billingAddress,
                isSameAddress: true,
            })
        }

        if (isSecondStep) {
            makePayment(values)
        }

        actions.setTouched({})
    }

    async function makePayment(values) {}

    return (
        <Box width='80%' m='100px auto'>
            <Stepper activeStep={activeStep} sx={{ m: '20px 0' }}>
                <Step>
                    <StepLabel>Billing</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Payment</StepLabel>
                </Step>
            </Stepper>
            <Box>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={chekcoutSchema[activeStep]}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            {isFirstStep && (
                                <Shipping
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    setFieldValue={setFieldValue}
                                />
                            )}
                            {isSecondStep && (
                                <Payment
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    setFieldValue={setFieldValue}
                                />
                            )}
                            <Box
                                display='flex'
                                justifyContent='space-between'
                                gap='50px'
                            >
                                {isSecondStep && (
                                    <Button
                                        fullWidth
                                        color='primary'
                                        variant='contained'
                                        sx={{
                                            backgroundColor:
                                                shades.primary[200],
                                            boxShadow: 'none',
                                            color: 'white',
                                            borderRadius: 0,
                                            padding: '15px 40px',
                                        }}
                                        onClick={setActiveStep(activeStep - 1)}
                                    >
                                        Back
                                    </Button>
                                )}
                                <Button
                                    fullWidth
                                    type='submit'
                                    color='primary'
                                    variant='contained'
                                    sx={{
                                        backgroundColor: shades.primary[400],
                                        boxShadow: 'none',
                                        color: 'white',
                                        borderRadius: 0,
                                        padding: '15px 40px',
                                    }}
                                >
                                    {isFirstStep ? 'Next' : 'Place Order'}
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </Box>
    )
}

export default Checkout