import { Form, DatePicker, InputPicker, ButtonToolbar, Button, Schema, Divider, useToaster, Uploader, Message, Loader } from 'rsuite'
import { useDispatch } from 'react-redux'
import { createEmployee } from '../../features/employeesSlice'
import { departments, states } from '../../infos'
import { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { infoEmployee } from '../../infos'
import AvatarIcon from '@rsuite/icons/legacy/Avatar'

const { StringType, DateType } = Schema.Types
const model = Schema.Model({
    firstName: StringType().isRequired('This field is required.'),
    lastName: StringType().isRequired('This field is required.'),
    dateOfBirth: DateType().isRequired('This field is required.'),
    startDate: DateType().isRequired('This field is required.'),
    street: StringType().isRequired('This field is required.'),
    city: StringType().isRequired('This field is required.'),
    state: StringType().isRequired('This field is required.'),
    zipCode: StringType().isRequired('This field is required.'),
    department: StringType().isRequired('This field is required.'),
})

function previewFile(file, callback) {
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
}

export default function CreateForm({ handleOpen }) {
    const dispatch = useDispatch()
    const formRef = useRef()
    const [formError, setFormError] = useState({})
    const [formValue, setFormValue] = useState(infoEmployee)
    const toaster = useToaster()
    const [uploading, setUploading] = useState(false);
    const [fileInfo, setFileInfo] = useState(null)
    const [data, setData] = useState([])
    const [image, setImage] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4001/posts')
            .then(res => setData(res.data))
            .catch(err => console.error(err));
    }, []);
    useEffect(() => {
        axios.get('http://localhost:4001/submit')
            .then(res => setImage(res.data))
            .catch(err => console.error(err));
    }, []);

    // console.log(fileInfo)
    const handleSubmit = () => {
        if (!formRef.current.check()) {
            console.log(formError, 'Form Error')
            return
        } else {
            dispatch(createEmployee(formValue))
            handleOpen()
        }
    }

    // const filePath = data.file_path.replace('\\', '/')

    console.log(image)
    return (
        <Form
            ref={formRef}
            layout="inline"
            formValue={formValue}
            onChange={setFormValue}
            onCheck={setFormError}
            model={model}
            // onSubmit={() => dispatch(createEmployee(formValue))}
        >
            <Form.Group controlId="avatar" style={{ float: 'right' }}>
                <Uploader
                    fileListVisible={false}
                    listType="picture"
                    action='/fileupload'
                    name='avatar'
                    method="POST"
                    encType="multipart/form-data"
                    onUpload={file => {
                        setUploading(true);
                        previewFile(file.blobFile, value => {
                            setFileInfo(value);
                            console.log(file.blobFile)
                            // dispatch(uploadFile(file.blobFile))
                            setFormValue({
                                ...formValue,
                                avatar: file.blobFile.name
                                
                            })
                        });
                    }}
                    onSuccess={(response, file) => {
                        setUploading(false);
                        toaster.push(<Message type="success">Uploaded successfully</Message>);
                        // console.log(response);
                    }}
                    onError={() => {
                        setFileInfo(null);
                        setUploading(false);
                        toaster.push(<Message type="error">Upload failed</Message>);
                    }}
                    style={{ padding: '0 5vw 2vh 0' }}
                >
                    <button style={{ width: 150, height: 150 }}>
                        {uploading && <Loader backdrop center />}
                        {fileInfo ? (
                            <img alt='avatar' src={fileInfo} width="100%" height="100%" />
                        ) : (
                            <AvatarIcon style={{ fontSize: 80 }} />
                        )}
                    </button>
                </Uploader>
            </Form.Group>

            <Form.Group controlId="firstName" style={{ width: '60%' }}>
                <Form.ControlLabel>First name</Form.ControlLabel>
                <Form.Control name="firstName" />
            </Form.Group>
            <Form.Group controlId="lastName" style={{ width: '60%' }}>
                <Form.ControlLabel>Last name</Form.ControlLabel>
                <Form.Control name="lastName" />
            </Form.Group>
            <Form.Group controlId="dateOfBirth" style={{ width: '30%' }}>
                <Form.ControlLabel>Date of birth</Form.ControlLabel>
                <Form.Control name="dateOfBirth" accepter={DatePicker} oneTap format="yyyy-MM-dd" />
            </Form.Group>
            <Form.Group controlId="startDate" style={{ width: '30%' }}>
                <Form.ControlLabel>Start date</Form.ControlLabel>
                <Form.Control name="startDate" accepter={DatePicker} oneTap format="yyyy-MM-dd" />
            </Form.Group>
            <Divider>ADDRESS</Divider>
            <Form.Group controlId="street" style={{ width: '45%' }}>
                <Form.ControlLabel>Street</Form.ControlLabel>
                <Form.Control name="street" />
            </Form.Group>
            <Form.Group controlId="city" style={{ width: '45%' }}>
                <Form.ControlLabel>City</Form.ControlLabel>
                <Form.Control name="city" />
            </Form.Group>
            <Form.Group controlId="state" style={{ width: '45%' }}>
                <Form.ControlLabel>State</Form.ControlLabel>
                <Form.Control name="state" accepter={InputPicker} data={states} />
            </Form.Group>
            <Form.Group controlId="zipCode" style={{ width: '45%' }}>
                <Form.ControlLabel>ZIP Code</Form.ControlLabel>
                <Form.Control name="zipCode" />
            </Form.Group>
            <Divider />
            <Form.Group controlId="department" style={{ width: '100%' }}>
                <Form.ControlLabel>Department</Form.ControlLabel>
                <Form.Control name="department" accepter={InputPicker} data={departments} />
            </Form.Group>
            <Form.Group>
                <ButtonToolbar>
                    <Button appearance="primary" type='submit' onClick={handleSubmit}>Submit</Button>
                    <Button appearance="default">Cancel</Button>
                </ButtonToolbar>
            </Form.Group>
        </Form>
    )
}