import { Form, Submit, TextField, TextAreaField, FieldError, Label } from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`
const ContactPage = () => {
  const [create] = useMutation(CREATE_CONTACT)
  const onSubmit = (data) => {
    create({ variables: { input: data } })
  }
  return (
    <>
      <MetaTags title="Contact" description="Contact page" />

      <h1>Contact us</h1>
      <Form onSubmit={onSubmit} config={{mode: 'onBlur'}}>
        <Label name='name'  errorClassName='error'>Name</Label>
        <TextField name="name" validation={{required: true}} errorClassName="error" />
        <FieldError name="name" className='error' />

        <Label name='email' errorClassName='error'>E-mail</Label>
        <TextField name="email" validation={{required: true, pattern: {
          value: /^[^@]+@[^.]+\..+$/,
          message: 'Please enter a valid email address'
        }}} errorClassName="error" />
        <FieldError name="email" className='error' />

        <Label name='message' errorClassName='error'>Message</Label>
        <TextAreaField name="message" validation={{required: true}} errorClassName="error" />
        <FieldError name="message" className='error' />

        <Submit>Send</Submit>
      </Form>
    </>
  )
}

export default ContactPage
