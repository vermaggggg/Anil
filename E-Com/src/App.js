import * as React from 'react';
import { Label } from '@fluentui/react/lib/Label';
import { useBoolean } from '@fluentui/react-hooks';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { ReactDialogBox } from 'react-js-dialog-box';
import 'react-js-dialog-box/dist/index.css';
import { TextField } from '@fluentui/react/lib/TextField';
import './App.css';
import ima1 from './images/img1.jpg'
import ima2 from './images/img2.jpg'
import ima3 from './images/img3.jpg';
import cart from './images/Cart.png';
import order from './images/orderplace.png';
const products = [
  {
    "id": "1",
    "name": "EyeBogler",
    "image": <img className='imghw' src={ima1} />,
    "cost": "356.32",
    "desc": "EyeBogler Men Dri Fit Polyester Half Sleeve Round Neck White t shirts Men Solid Round Neck White T-Shirt"
  },
  {
    "id": "2",
    "name": "BLIVE",
    "image": <img className='imghw' src={ima2} />,
    "cost": "256.00",
    "desc": "BLIVE Men Dri Fit Polyester Half Sleeve Round Neck White t shirts Men Solid Round Neck White T-Shirt"
  },
  {
    "id": "3",
    "name": "VeBNoR",
    "image": <img className='imghw' src={ima3} />,
    "cost": "600.99",
    "desc": "VeBNoR Men Dri Fit Polyester Half Sleeve Round Neck White t shirts Men Solid Round Neck White T-Shirt"
  }
]
let prvVal = [];
function App() {
  const [cartnumber, setcartnumber] = React.useState(0);
  const [newArray, setnewArray] = React.useState([]);
  const [addtocart, setaddtocart] = React.useState([]);
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
  const [isOpenRv, { setTrue: openPanelRv, setFalse: dismissPanelRv }] = useBoolean(false);
  const [userData, setUserData] = React.useState({
    fname: "",
    lname: "",
    mobile: "",
    email: "",
    address: ""
  })
  const [Model, { setTrue: openModel, setFalse: dismissModel }] = useBoolean(false);
  const handleData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }
  const addCart = (e) => {
    if (prvVal.indexOf(e) <= 0) {
      let tNum = cartnumber + 1;
      setcartnumber(tNum);
      prvVal.push(e);
      setaddtocart(prvVal);

    }

  }
  function CartOpen() {
    if (addtocart.length > 0) {
      openPanel();
    }
    else {
      alert("Please Select Item")
    }

  }
  function openSubmitpanel() {
    let NewnewArray = [];
    if (userData.address != "" && userData.email != "" && userData.fname != "" && userData.lname != "" && userData.mobile != "") {
      for (let i = 0; i < products.length; i++) {
        var prdtID = products[i].id;
        for (let j = 0; j < addtocart.length; j++) {
          var selectedID = addtocart[j];
          if (prdtID == selectedID) {
            NewnewArray.push(products[i]);
          }
        }
      }
      setnewArray(NewnewArray);
      openPanelRv();
      dismissPanel();
    }
    else {
      alert("Please Fill All Values")
    }

  }
  function cancelAllOrder() {
    dismissPanelRv();
    setaddtocart([]);
    setnewArray([]);
    setcartnumber(0);
    dismissModel();
    setUserData({
      fname: "",
      lname: "",
      mobile: "",
      email: "",
      address: ""
    })
  }
  function PlaceOrder() {
    dismissPanelRv();
    openModel();
  }
  return (
    <div>
      <div className="divstyle">
        <div style={{ display: 'flex' }}>
          <Label style={{ fontSize: '30px', margin: '1% 0 0 6%' }}>Products</Label>
          <div onClick={CartOpen} style={{ cursor: 'pointer', margin: '2% 0 0 70%', display: 'flex' }}><Label style={{ position: 'fixed', right: '175px', top: '0%', fontSize: '20px' }}>{cartnumber}</Label><img style={{ height: '50px' }} src={cart} /></div>

        </div>
        <div className='maindiv'>
          {
            products.map((item) => {
              return (
                <div className='productstyle'>
                  <div className='imgdiv'>{item.image}</div>
                  <div style={{ display: 'flex', border: '1px solid white' }}>
                    <div style={{ width: '50%', marginLeft: '20px' }}>
                      <Label>{item.name}</Label>
                      <Label>${item.cost}</Label>
                    </div>

                    <div style={{ width: '50%', marginTop: '10px' }}>
                      <button disabled={addtocart.includes(item.id)} style={{ cursor: 'pointer' }} id={item.id} onClick={() => addCart(item.id)}>
                        Add to cart
                      </button>
                    </div>

                  </div>
                  <div style={{ padding: '5px 5px 0px 20px' }}>{item.desc}</div>
                </div>
              )

            })
          }
        </div>
      </div>
      <div>
        <Panel
          headerText="Please Submit Details"
          isOpen={isOpen}
          type={PanelType.smallFixedFar}
          onDismiss={dismissPanel}
          customWidth={'600px'}
          closeButtonAriaLabel="Close"
        >
          <div>
            <TextField value={userData.fname} required name='fname' onChange={handleData} label="First Name" />
            <TextField value={userData.lname} required name='lname' onChange={handleData} label="Last Name" />
            <TextField value={userData.email} required name='email' onChange={handleData} label="Email Address" />
            <TextField value={userData.mobile} required name='mobile' onChange={handleData} label="Mobile Number" />
            <TextField value={userData.address} required name='address' onChange={handleData} multiline rows={3} label="Address" />
            <div style={{ marginTop: '40px' }}>
              <DefaultButton style={{ marginLeft: '30px' }} onClick={openSubmitpanel} text="Submit" allowDisabledFocus />
              <PrimaryButton style={{ marginLeft: '40px' }} onClick={dismissPanel} text="Cancel" allowDisabledFocus />
            </div>

          </div>
        </Panel>
      </div>
      <div>
        <Panel
          headerText="Review and Submit order page"
          isOpen={isOpenRv}
          type={PanelType.medium}
          onDismiss={dismissPanelRv}
          closeButtonAriaLabel="Close"
        >
          <div>
          <Label style={{ fontSize: '18px' }}>Selected  Products</Label>
          {newArray.length>0?
          <>
          <div style={{ marginTop: '25px' }}>
             
             
             {newArray.map((item,index) => {
               return (
                 <>
                   <div style={{ display: 'flex', height: '90px', marginTop: '10px', border: '1px solid #d4d4d4d4' }}>

                     <div style={{ width: '50%' }}>
                       <Label style={{ marginLeft: '20px' }}>{item.name}</Label>
                       <Label style={{ marginLeft: '20px' }}>$ {item.cost}</Label>
                       <Label style={{ marginLeft: '20px' }}>Delivery your order 5-7 days</Label>
                     </div>
                     <div style={{ width: '50%' }}>
                       <Label style={{ fontSize: '18px' }}>Address</Label>
                       <div style={{ display: 'flex', flexFlow: 'wrap' }}>
                         <Label style={{ marginLeft: '8px' }}>{userData.fname}</Label>
                         <Label style={{ marginLeft: '3px' }}>{userData.lname}</Label>
                         <Label style={{ marginLeft: '8px' }}>{userData.mobile}</Label>
                         <Label style={{ marginLeft: '8px' }}>{userData.email}</Label>
                         <Label style={{ marginLeft: '8px' }}>{userData.address}</Label>
                       </div>
                     </div>
                   </div>

                 </>
               )
             })}
           </div>
           <div>
             <button onClick={PlaceOrder} style={{ marginTop: '18px', cursor: 'pointer' }}>Place All Order</button>
             <button onClick={cancelAllOrder} style={{ margin: '18px 20px 0px 90px', cursor: 'pointer' }}>Cancel All Order</button>
           </div>
          </>
          :""}
            
          </div>
        </Panel>
      </div>
      <div>
        {Model && (
          <>
            <ReactDialogBox
              closeBox={dismissModel}
              modalWidth='40%'
              headerBackgroundColor='red'
              headerTextColor='white'
              headerHeight='65'
              closeButtonColor='white'
              bodyBackgroundColor='white'
              bodyTextColor='black'
              bodyHeight='200px'
              headerText='Review and Submit order'
            >
              <div>
                <div style={{border: '1px solid #d4d4d4d4'}}>
                  <Label>Order successful place</Label>
                  <Label>This order received you within 5-7 days in this address</Label>
                </div>
                <div style={{padding:'10px', border: '1px solid #d4d4d4d4'}}>
                  <Label style={{ fontSize: '18px' }}>Address</Label>
                  <div style={{ display: 'flex', flexFlow: 'wrap' }}>
                    <Label style={{ marginLeft: '8px' }}>{userData.fname}</Label>
                    <Label style={{ marginLeft: '3px' }}>{userData.lname}</Label>
                    <Label style={{ marginLeft: '8px' }}>{userData.mobile}</Label>
                    <Label style={{ marginLeft: '8px' }}>{userData.email}</Label>
                    <Label style={{ marginLeft: '8px' }}>{userData.address}</Label>
                  </div>
                </div>
                <div style={{textAlign:'center',paddingTop: '14px'}}> <button onClick={cancelAllOrder}>Close</button></div>
              </div>
            </ReactDialogBox>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
