import { Fragment, useState, useContext } from 'react';
import FileInput from '../../atoms/fileInput';
import FormInput from '../../atoms/formInput';
import TextArea from '../../atoms/textarea';
import Button from '../../atoms/button';
import Galery from '../../../images/icon/galery.png';
import './formEditChannel.css';
import { API } from '../../../config/api';
import { AppContext } from '../../../context/appContext';
import { useHistory } from 'react-router-dom';

export default function FormEditChannel() {
  const [state] = useContext(AppContext);
  const { channel } = state;
  const [formData, setFormData] = useState({
    channelName: channel.channelName,
    thumbnail: '',
    description: channel.description,
    photo: '',
  });
  const { channelName, thumbnail, description, photo } = formData;
  const router = useHistory();

  const body = new FormData();
  body.append('channelName', channel.channelName);
  body.append('thumbnail', thumbnail);
  body.append('description', channel.description);
  body.append('photo', photo);

  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await API.patch(`channel/${channel.id}`, body, config);

      setFormData({
        channelName: '',
        thumbnail: '',
        description: '',
        photo: '',
      });

      router.push('/channel/profile');
      window.location.reload();
      console.log(body);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const updateForm = {
      ...formData,
    };
    console.log(e.target.type);
    updateForm[e.target.name] =
      e.target.type === 'file' ? e.target.files[0] : e.target.value;
    setFormData(updateForm);
  };
  console.log(formData);

  return (
    <Fragment>
      <div className='line1 my-4'>
        <FormInput
          customClass='inputClass'
          title={channel.channelName}
          onChange={(e) => handleChange(e)}
          name='channelName'
        />
        <FileInput
          title='Upload Cover'
          icon={Galery}
          onChange={(e) => handleChange(e)}
          style={{
            position: 'absolute',
            width: '25px',
            marginLeft: '240px',
            top: '143px',
            transform: 'translate(13px, -12px)',
          }}
          name='thumbnail'
        />
      </div>
      <TextArea
        title={channel.description}
        customClass='areaClass mb-4'
        onChange={(e) => handleChange(e)}
        name='description'
      />
      <FileInput
        title='Upload Photo'
        icon={Galery}
        onChange={(e) => handleChange(e)}
        style={{
          marginLeft: '250px',
          position: 'absolute',
          top: '390px',
          transform: 'translate(0, -12px)',
        }}
        name='photo'
      />
      <Button
        title='Save'
        customClass='buttonEditChannel mt-4'
        onClick={(e) => handleUpdate(e)}
      />
    </Fragment>
  );
}
