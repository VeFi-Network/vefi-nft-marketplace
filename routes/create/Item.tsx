import React from 'react';
import { FiImage, FiPlus } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import { FormWrapper, SectionContainer, SectionWrapper } from '../../styles/createCollections.styled';
import { Button, InputNumber, Select, Switch, Tooltip } from 'antd';
const { Option } = Select;
const CreateNewItem = () => {
  function handleChange(value: string) {
    console.log(`selected ${value}`);
  }

  return (
    <>
      <SectionWrapper>
        <Navbar />
        <div className="exploreNft"></div>
        <SectionContainer>
          <FormWrapper>
            <div className="heading">
              <h2>Create your Item</h2>
            </div>
            <div className="form__field">
              <div className="title">
                <h3>
                  Image, Video, Audio or 3D model <span>*</span>
                </h3>
                <p>
                  File type supported: jpg, png, gif, Mp4, SVG, WEBM, Mp3, WAV, OGG, GLB, GLTF,{' '}
                  <span>
                    <Tooltip title="Maximum supported file size">Max size 40mb</Tooltip>
                  </span>
                </p>
              </div>
              <div className="form__body">
                <div className="file__upload__wrapper rectangle">
                  <input type="file" name="logo" id="" />
                  <FiImage className="icon" />
                </div>
              </div>
            </div>

            <div className="form__field">
              <div className="title">
                <h3>
                  Name <span>*</span>
                </h3>
              </div>
              <div className="form__body">
                <input type="text" placeholder="Name" />
              </div>
            </div>
            <div className="form__field">
              <div className="title">
                <h3>External link</h3>
                <p>
                  VefiNft will include a link to this URL on this item’s detail page so users can click to learn more
                  about it so you are welcome to link your own web page with more details.
                </p>
              </div>
              <div className="form__body">
                <input type="text" placeholder="https//vefinft.io/assets/lost-in-space" />
              </div>
            </div>
            <div className="form__field">
              <div className="title">
                <h3>
                  Description <span>*</span>
                </h3>
                <p>The description will be included on the item detail page underneath its image.</p>
              </div>
              <div className="form__body">
                <textarea
                  name="description"
                  id="description"
                  cols={60}
                  rows={6}
                  placeholder="provide a detailed description of your item"
                ></textarea>
              </div>
            </div>
            <div className="form__field">
              <div className="title">
                <h3>Collection</h3>
                <p>This is the collection where your item will appear.</p>
              </div>
              <div className="select__field">
                <Select defaultValue="Select collection" style={{ width: 150 }} onChange={handleChange}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </div>
            </div>
            <div className="form__field">
              <div className="title">
                <h3>properties</h3>
                <p>Textual traits that show up as rectangles you can choose more than one.</p>
              </div>
              <div className="select__field">
                <Select defaultValue="Select properties" style={{ width: 150 }} onChange={handleChange}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                </Select>
              </div>
            </div>

            <div className="form__field">
              <div className="title">
                <h3>Unlockable content</h3>
                <p>Include unlockable contents that can only be revield by the owner of the item.</p>{' '}
                <Switch defaultChecked onChange={e => console.log(e)} />
              </div>
            </div>
            <div className="form__field">
              <div className="title">
                <h3>Explicit and sensitive content</h3>
                <p>Set this collection as explicit and sensitive content.</p>{' '}
                <Switch defaultChecked onChange={e => console.log(e)} />
              </div>
            </div>
            <div className="form__field">
              <Button type="primary" className="submitBtn">
                Create
              </Button>
            </div>
          </FormWrapper>
        </SectionContainer>
      </SectionWrapper>
    </>
  );
};

export default CreateNewItem;
