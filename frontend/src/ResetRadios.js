import React, { useState } from 'react';
import api from './services/api';

export default function ResetRadios({ display, setSelectedValue, selectedValue, buttonClicked })
{
    const [affectedRows, setAffectedRows] = useState(-1);
    function ButtonHandler() {
        buttonClicked(true);
        console.log("Click");
        api.submitResetRequest({ location: selectedValue })
          .then((data) => {
            console.log('Reset request submitted:', data);
            setAffectedRows(data.affectedRows);
          })
          .catch((err) => {
            console.error('Error submitting reset request:', err);
          });
        console.log("Done");
    }
    const handleRadioChange = (value) => {
        setSelectedValue(value);
      };
    if (display) return <div className="radioGroup">
                <div className="radioButton">
                    <input
                    type="radio"
                    id="CA"
                    name="library"
                    value="CA"
                    checked={selectedValue === 'CA'}
                    onChange={() => handleRadioChange('CA')}
                    />
                    <label htmlFor="CA" className="radioLabel">CA</label>
                </div>
                <div className="radioButton">
                    <input
                    type="radio"
                    id="CU"
                    name="library"
                    value="CU"
                    checked={selectedValue === 'CU'}
                    onChange={() => handleRadioChange('CU')}
                    />
                    <label htmlFor="CU" className="radioLabel">CU</label>
                </div>
                <div className="radioButton">
                    <input
                    type="radio"
                    id="GI"
                    name="library"
                    value="GI"
                    checked={selectedValue === 'GI'}
                    onChange={() => handleRadioChange('GI')}
                    />
                    <label htmlFor="GI" className="radioLabel">GI</label>
                </div>
                <div className="radioButton">
                    <input
                    type="radio"
                    id="LA"
                    name="library"
                    value="LA"
                    checked={selectedValue === 'LA'}
                    onChange={() => handleRadioChange('LA')}
                    />
                    <label htmlFor="LA" className="radioLabel">LA</label>
                </div>
                <div className="radioButton">
                    <input
                    type="radio"
                    id="MI"
                    name="library"
                    value="MI"
                    checked={selectedValue === 'MI'}
                    onChange={() => handleRadioChange('MI')}
                    />
                    <label htmlFor="MI" className="radioLabel">MI</label>
                </div>
                <div className="radioButton">
                    <input
                    type="radio"
                    id="MH"
                    name="library"
                    value="MH"
                    checked={selectedValue === 'MH'}
                    onChange={() => handleRadioChange('MH')}
                    />
                    <label htmlFor="MH" className="radioLabel">MH</label>
                </div>
                <div className="radioButton">
                    <input
                    type="radio"
                    id="SA"
                    name="library"
                    value="SA"
                    checked={selectedValue === 'SA'}
                    onChange={() => handleRadioChange('SA')}
                    />
                    <label htmlFor="SA" className="radioLabel">SA</label>
                </div>
                <div className="radioButton">
                    <input
                    type="radio"
                    id="SSC"
                    name="library"
                    value="SSC"
                    checked={selectedValue === 'SSC'}
                    onChange={() => handleRadioChange('SSC')}
                    />
                    <label htmlFor="SSC" className="radioLabel">SSC</label>
                </div>
                <div className="radioButton">
                    <input
                    type="radio"
                    id="WO"
                    name="library"
                    value="WO"
                    checked={selectedValue === 'WO'}
                    onChange={() => handleRadioChange('WO')}
                    />
                    <label htmlFor="WO" className="radioLabel">WO</label>
                </div>
                <div>
                    <button type="button" className="submitButton" onClick={() => ButtonHandler()}>
                    Submit
                    </button>
                </div>
            </div>;
        else return <div>
            <p>Reset request has affected {affectedRows} rows.</p>
        </div>
}