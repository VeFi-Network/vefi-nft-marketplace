import React from 'react';
import { FiImage, FiPlus } from 'react-icons/fi';
import { FormWrapper } from '../../styles/createCollections.styled';
import { Button, InputNumber, Select, Switch } from 'antd';

const { Option } = Select;
const CreateNewCollection = () => {
  function handleChange(value: string) {
    console.log(`selected ${value}`);
  }

  return (
    <>
      <FormWrapper>
        <div className="heading">
          <h2>Create your Collection</h2>
        </div>
        <div className="form__field">
          <div className="title">
            <h3>
              Logo Image <span>*</span>
            </h3>
            <p>This image will also be used for navigation 350x350 recommended</p>
          </div>
          <div className="form__body">
            <div className="file__upload__wrapper circle">
              <input type="file" name="logo" id="" />
              <FiImage className="icon" />
            </div>
          </div>
        </div>
        <div className="form__field">
          <div className="title">
            <h3>
              Featured Image <span>*</span>
            </h3>
            <p>
              This image will be used to feature your artwork on the home page category pages or other promotional areas
              in VefiNft. (Optional)
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
              Banner Image <span>*</span>
            </h3>
            <p>
              This image will appear at the top of your collection page avoid to add too much text, as the dimension
              change on different device 1440x250 recomended (Optional)
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
            <input type="text" />
          </div>
        </div>
        <div className="form__field">
          <div className="title">
            <h3>
              URL <span>*</span>
            </h3>
            <p>Customize your URL on VefiNft, Must only contain lover case Letters, numbers and Hyphens.</p>
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
            <p>Note Syntax is supported. 1 to 2000 words only</p>
          </div>
          <div className="form__body">
            <textarea name="description" id="description" cols={60} rows={6}></textarea>
          </div>
        </div>
        <div className="form__field">
          <div className="select__field">
            <Select defaultValue="Add category" style={{ width: 150 }} onChange={handleChange}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
            </Select>
          </div>
        </div>
        <div className="form__field">
          <div className="title">
            <h3>
              Royalties <span>*</span>
            </h3>
            <p>
              Collect a fee when a user Re-sells an item you originally created. this is deducted from the final sale
              price and paid monthly to a payout adress of your choosen.
            </p>
          </div>
          <div className="form__body">
            <div className="title">
              <h3>Percentage fee</h3>
            </div>
            <InputNumber min={1} max={10} defaultValue={3} onChange={() => console.log(1)} />
          </div>
        </div>
        <div className="form__field">
          <div className="title">
            <h3>Blockchain</h3>
            <p>Sellect the blockchain where you’d like new items from this collection to be added by defult.</p>
          </div>
          <div className="select__field">
            <Select defaultValue="Add Blockchain" style={{ width: 150 }} onChange={handleChange}>
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
            <h3>Payment Tokens</h3>
            <p>Sellect the blockchain where you’d like new items from this collection to be added by defult.</p>
          </div>
          <div className="select__field">
            <Select defaultValue="Etherium" style={{ width: 150 }} onChange={handleChange}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
            </Select>
            <Button type="primary" icon={<FiPlus />}>
              Add Token
            </Button>
          </div>
        </div>
        <div className="form__field">
          <div className="title">
            <h3>Explicit and sensitive content</h3>
            <p>Set this collection as explicit and sensitive content</p>{' '}
            <Switch defaultChecked onChange={e => console.log(e)} />
          </div>
        </div>
        <div className="form__field">
          <Button type="primary" className="submitBtn">
            Create
          </Button>
        </div>
      </FormWrapper>
    </>
  );
};

export default CreateNewCollection;
