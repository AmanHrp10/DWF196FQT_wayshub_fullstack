import FormInput from '../../atoms/formInput';
import FileInput from '../../atoms/fileInput';
import Textarea from '../../atoms/textarea';
import Button from '../../atoms/button';
import AddThumbnail from '../../../images/icon/addThumbnail.png';
import AddVideo from '../../../images/icon/addActive.png';
import './formAddVideo.css';

import { Fragment, useState } from 'react';
import { API } from '../../../config/api';
import { useHistory } from 'react-router-dom';

export default function FormAdd() {
  const [formData, setFormData] = useState({
    title: '',
    thumbnail: '',
    description: '',
    video: '',
  });
  const { title, thumbnail, description, video } = formData;

  const router = useHistory();

  const handleAdd = async (e) => {
    e.preventDefault();

    const body = new FormData();
    body.append('title', title);
    body.append('thumbnail', thumbnail);
    body.append('description', description);
    body.append('video', video);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    try {
      const response = await API.post('/video', body, config);
      setFormData({
        title: '',
        thumbnail: '',
        description: '',
        video: '',
      });
      router.push('/channel/profile');
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const updateForm = { ...formData };
    console.log(e.target.type);
    updateForm[e.target.name] =
      e.target.type === 'file' ? e.target.files[0] : e.target.value;
    setFormData(updateForm);
  };

  console.log(formData);

  return (
    <Fragment>
      <h5 className='mb-4 text-white'>Add Video</h5>
      <form onSubmit={(e) => handleAdd(e)}>
        <div className='row mb-3'>
          <div className='col-md-8'>
            <FormInput
              title='Nama'
              type='text'
              name='title'
              value={title}
              onChange={(e) => handleChange(e)}
              customClass='custom-form-control'
            />
          </div>
          <div className='col-md-4'>
            <FileInput
              title='Attach Thumbnail'
              type='file'
              onChange={(e) => handleChange(e)}
              name='thumbnail'
              icon={AddThumbnail}
              style={{
                position: 'absolute',
                width: '15px',
                marginLeft: '250px',
                top: '8px',
                transform: 'translate(8px)',
              }}
            />
          </div>
        </div>
        <Textarea
          title='Description'
          type='text'
          customClass='custom-form-control mb-3'
          onChange={(e) => handleChange(e)}
          value={description}
          name='description'
        />
        <FileInput
          title='Upload Video'
          type='file'
          icon={AddVideo}
          onChange={(e) => handleChange(e)}
          name='video'
          style={{
            position: 'absolute',
            width: '25px',
            marginLeft: '250px',
            paddingTop: '-9px',
            top: '394px',
            transform: 'translate(2px)',
          }}
        />
        <Button
          type='submit'
          title='Add'
          customClass='btn btn-orange custom-form-control mt-4'
        />
      </form>
    </Fragment>
  );
}
