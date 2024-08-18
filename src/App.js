import { useState } from 'react';
import axios from 'axios'


const dropdownData = [
  'physiotherapy',
  'DAA'
];

function App() {
  const [formData, setFormData] = useState({
    ProposedEntityName: "",
    ProposedDate: new Date().toISOString().split('T')[0],
    CategoryOfEntity: "",
    TypeOfEntity:"",
    ProposedBy: "",
    proponentName: "",
    proponentDepartment: "",
    natureofEntity: "",
    proposedFacultyAdvisor1: {
      ProposedFacultyAdvisorName: "",
      ProposedFacultyAdvisorEid: "",
      MobileNumber: ""
    },
    proposedFacultyAdvisor2: {
      ProposedFacultyAdvisorName: "",
      ProposedFacultyAdvisorEid: "",
      MobileNumber: ""
    },
    proposedFacultyCoAdvisor1: {
      ProposedFacultyCoAdvisorName: "",
      ProposedFacultyCoAdvisorEid: "",
      MobileNumber: ""
    },
    proposedFacultyCoAdvisor2: {
      ProposedFacultyCoAdvisorName: "",
      ProposedFacultyCoAdvisorEid: "",
      MobileNumber: ""
    },
    proposedStudentRepresentative1:{
      proposedStudentRepresentativeName:"",
      proposedStudentRepresentativeUid:"",
      MobileNumber:""
    },
    proposedStudentRepresentative2:{
      proposedStudentRepresentativeName:"",
      proposedStudentRepresentativeUid:"",
      MobileNumber:""
    },
    proposedStudentJointRepresentative1:{
      proposedStudentRepresentativeName:"",
      proposedStudentRepresentativeUid:"",
      MobileNumber:""
    },
    proposedStudentJointRepresentative2:{
      proposedStudentRepresentativeName:"",
      proposedStudentRepresentativeUid:"",
      MobileNumber:""
    },
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [id]: value
    }));
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSelectChange = (e) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      proponentDepartment: e.target.value
    }));
  };

  const handleAdvisorInputChange = (e, advisorType) => {
    const { id, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [advisorType]: {
        ...prevFormData[advisorType],
        [id]: value
      }
    }));
  };

  const handleStudentRepresentativeChange = (e, repType) => {
    const { id, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [repType]: {
        ...prevFormData[repType],
        [id]: value
      }
    }));
  };

  const submitHandler = async(e) => {
    e.preventDefault();
    console.log("form is : ", formData);
    if(formData.TypeOfEntity==='Club'){
      
      const updatedformobject={...formData,ProposedClubName:formData.ProposedEntityName}

      const response=await axios.post('http://localhost:4000/api/clubRoutes/clubs',updatedformobject);
      console.log("this is response of club: ",response);

    }

    else if(formData.TypeOfEntity==='Community'){
      const updatedformobject={...formData,ProposedCommunityName:formData.ProposedEntityName}

      const response=await axios.post('http://localhost:4000/api/communitiesRoutes/communities',updatedformobject);
      console.log("this is response of communities: ",response);

    }

    else if(formData.TypeOfEntity==='Dept.Society'){
      const updatedformobject={...formData,ProposedSocietyName:formData.ProposedEntityName}

      const response=await axios.post('http://localhost:4000/api/deptSocieties/departmental-societies',updatedformobject);
      console.log("this is response of dept.societies: ",response);

    }

    else{
      const updatedformobject={...formData,ProposedSocietyName:formData.ProposedEntityName}

      const response=await axios.post('http://localhost:4000/api/proffSocieties/professional-societies',updatedformobject);
      console.log("this is response of proff.societies: ",response);
    }

    
  };

  return (
    <div className="App p-10">
      {/* Entity Information */}
      <div className='flex '>
        <div className='flex gap-6 border p-3 border-black'>
          <label htmlFor="ProposedEntityName">Proposed Entity Name</label>
          <input
            type="text"
            id="ProposedEntityName"
            className='outline-none'
            value={formData.ProposedEntityName}
            onChange={handleInputChange}
          />
        </div>
        <div className='flex gap-6 border p-3 border-black'>
          <label htmlFor="ProposedDate">Proposed Date</label>
          <input
            type="date"
            id="ProposedDate"
            className='outline-none'
            value={formData.ProposedDate}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className='mt-6 flex items-center'>
        <p className='border border-black p-3 w-2/12 text-sm text-start'>Category of Entity</p>
        {["a", "b", "c", "d"].map((type, index) => (
          <label key={index} className='border text-sm border-black p-3 w-2/12'>
            <input
              type="radio"
              name="CategoryOfEntity"
              value={type}
              checked={formData.CategoryOfEntity === type}
              onChange={handleRadioChange}
            />
            {type}
          </label>
        ))}
      </div>

      {/* Entity Type */}
      <div className='mt-6 flex items-center'>
        <p className='border border-black p-3 w-2/12 text-sm text-start'>Type of Entity</p>
        {["Club", "Community", "Dept.Society", "Proff.Society"].map((type, index) => (
          <label key={index} className='border text-sm border-black p-3 w-2/12'>
            <input
              type="radio"
              name="TypeOfEntity"
              value={type}
              checked={formData.TypeOfEntity === type}
              onChange={handleRadioChange}
            />
            {type}
          </label>
        ))}
      </div>

      {/* Proposed By */}
      <div className='mt-6 flex items-center'>
        <p className='border border-black p-3 w-2/12 text-start text-sm'>Proposed By</p>
        {["faculty", "student"].map((proposer, index) => (
          <label key={index} className='border text-sm border-black p-3 w-1/12'>
            <input
              type="radio"
              name="ProposedBy"
              value={proposer}
              checked={formData.ProposedBy === proposer}
              onChange={handleRadioChange}
            />
            {proposer}
          </label>
        ))}
      </div>

      {/* Proponent Information */}
      <div className='mt-6 flex '>
        <div className='flex border border-black p-3 items-center gap-3'>
          <label htmlFor="proponentName">Proponent Name</label>
          <input
            type="text"
            id="proponentName"
            className='outline-none'
            value={formData.proponentName}
            onChange={handleInputChange}
          />
        </div>

        <div className='p-3 border border-black flex items-center gap-3'>
          <label htmlFor="proponentDepartment">Proponent Department</label>
          <select
            id="proponentDepartment"
            className='outline-none'
            value={formData.proponentDepartment}
            onChange={handleSelectChange}
          >
            <option value="" disabled>Select Department</option>
            {dropdownData.map((department, index) => (
              <option key={index} value={department}>
                {department}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Nature of Entity */}
      <div className='mt-6 flex '>
        <p className='border border-black p-3 w-6/12 text-start'>Nature of Entity</p>
        {["Domain Specific(Skill Based)", "Invention and incubation", "Hackathon and Challenge", "Social Value and Outreach"].map((nature, index) => (
          <label key={index} className='border text-sm border-black p-3 w-full'>
            <input
              type="radio"
              name="natureofEntity"
              value={nature}
              checked={formData.natureofEntity === nature}
              onChange={handleRadioChange}
            />
            {nature}
          </label>
        ))}
      </div>

      {/* Faculty Advisor Details */}
      <div className='w-full px-3 py-5 border border-black'>
        Faculty Advisor/ Faculty Co-Advisor Details:
      </div>

      {/* Proposed Faculty Advisor 1 */}
      <div className='border border-black p-3'>
        <p>Proposed Faculty Advisor 1 details:</p>
        <div className='flex gap-3'>
          <input
            type="text"
            id="ProposedFacultyAdvisorName"
            className='outline-none'
            placeholder="Faculty Advisor Name"
            value={formData.proposedFacultyAdvisor1.ProposedFacultyAdvisorName}
            onChange={(e) => handleAdvisorInputChange(e, "proposedFacultyAdvisor1")}
          />
          <input
            type="text"
            id="ProposedFacultyAdvisorEid"
            className='outline-none'
            placeholder="Faculty Advisor EID"
            value={formData.proposedFacultyAdvisor1.ProposedFacultyAdvisorEid}
            onChange={(e) => handleAdvisorInputChange(e, "proposedFacultyAdvisor1")}
          />
          <input
            type="tel"
            id="MobileNumber"
            className='outline-none'
            placeholder="Mobile Number"
            value={formData.proposedFacultyAdvisor1.MobileNumber}
            onChange={(e) => handleAdvisorInputChange(e, "proposedFacultyAdvisor1")}
          />
        </div>
      </div>

      {/* Proposed Faculty Advisor 2 */}
      <div className='border border-black p-3 mt-6'>
        <p>Proposed Faculty Advisor 2 details:</p>
        <div className='flex gap-3'>
          <input
            type="text"
            id="ProposedFacultyAdvisorName"
            className='outline-none'
            placeholder="Faculty Advisor Name"
            value={formData.proposedFacultyAdvisor2.ProposedFacultyAdvisorName}
            onChange={(e) => handleAdvisorInputChange(e, "proposedFacultyAdvisor2")}
          />
          <input
            type="text"
            id="ProposedFacultyAdvisorEid"
            className='outline-none'
            placeholder="Faculty Advisor EID"
            value={formData.proposedFacultyAdvisor2.ProposedFacultyAdvisorEid}
            onChange={(e) => handleAdvisorInputChange(e, "proposedFacultyAdvisor2")}
          />
          <input
            type="tel"
            id="MobileNumber"
            className='outline-none'
            placeholder="Mobile Number"
            value={formData.proposedFacultyAdvisor2.MobileNumber}
            onChange={(e) => handleAdvisorInputChange(e, "proposedFacultyAdvisor2")}
          />
        </div>
      </div>

      <div className='border border-black p-3'>
        <p>Proposed Faculty Co-Advisor 1 details:</p>
        <div className='flex gap-3'>
          <input
            type="text"
            id="ProposedFacultyCoAdvisorName"
            className='outline-none'
            placeholder="Faculty Co-Advisor Name"
            value={formData.proposedFacultyCoAdvisor1.ProposedFacultyCoAdvisorName}
            onChange={(e) => handleAdvisorInputChange(e, "proposedFacultyCoAdvisor1")}
          />
          <input
            type="text"
            id="ProposedFacultyCoAdvisorEid"
            className='outline-none'
            placeholder="Faculty Co-Advisor EID"
            value={formData.proposedFacultyCoAdvisor1.ProposedFacultyCoAdvisorEid}
            onChange={(e) => handleAdvisorInputChange(e, "proposedFacultyCoAdvisor1")}
          />
          <input
            type="tel"
            id="MobileNumber"
            className='outline-none'
            placeholder="Mobile Number"
            value={formData.proposedFacultyCoAdvisor1.MobileNumber}
            onChange={(e) => handleAdvisorInputChange(e, "proposedFacultyCoAdvisor1")}
          />
        </div>
      </div>

      {/* Proposed Faculty Co-Advisor 2 */}
      <div className='border border-black p-3 mt-6'>
        <p>Proposed Faculty Co-Advisor 2 details:</p>
        <div className='flex gap-3'>
          <input
            type="text"
            id="ProposedFacultyCoAdvisorName"
            className='outline-none'
            placeholder="Faculty Co-Advisor Name"
            value={formData.proposedFacultyCoAdvisor2.ProposedFacultyCoAdvisorName}
            onChange={(e) => handleAdvisorInputChange(e, "proposedFacultyCoAdvisor2")}
          />
          <input
            type="text"
            id="ProposedFacultyCoAdvisorEid"
            className='outline-none'
            placeholder="Faculty Co-Advisor EID"
            value={formData.proposedFacultyCoAdvisor2.ProposedFacultyCoAdvisorEid}
            onChange={(e) => handleAdvisorInputChange(e, "proposedFacultyCoAdvisor2")}
          />
          <input
            type="tel"
            id="MobileNumber"
            className='outline-none'
            placeholder="Mobile Number"
            value={formData.proposedFacultyCoAdvisor2.MobileNumber}
            onChange={(e) => handleAdvisorInputChange(e, "proposedFacultyCoAdvisor2")}
          />
        </div>
      </div>

      {/* Proposed Student Representatives */}
      {/* Student Representative 1 */}
      <div className='border border-black p-3 mt-6'>
        <p>Proposed Student Representative 1 details:</p>
        <div className='flex gap-3'>
          <input
            type="text"
            id="proposedStudentRepresentativeName"
            className='outline-none'
            placeholder="Student Representative Name"
            value={formData.proposedStudentRepresentative1.proposedStudentRepresentativeName}
            onChange={(e) => handleStudentRepresentativeChange(e, "proposedStudentRepresentative1")}
          />
          <input
            type="text"
            id="proposedStudentRepresentativeUid"
            className='outline-none'
            placeholder="Student Representative UID"
            value={formData.proposedStudentRepresentative1.proposedStudentRepresentativeUid}
            onChange={(e) => handleStudentRepresentativeChange(e, "proposedStudentRepresentative1")}
          />
          <input
            type="tel"
            id="MobileNumber"
            className='outline-none'
            placeholder="Mobile Number"
            value={formData.proposedStudentRepresentative1.MobileNumber}
            onChange={(e) => handleStudentRepresentativeChange(e, "proposedStudentRepresentative1")}
          />
        </div>
      </div>

      {/* Student Representative 2 */}
      <div className='border border-black p-3 mt-6'>
        <p>Proposed Student Representative 2 details:</p>
        <div className='flex gap-3'>
          <input
            type="text"
            id="proposedStudentRepresentativeName"
            className='outline-none'
            placeholder="Student Representative Name"
            value={formData.proposedStudentRepresentative2.proposedStudentRepresentativeName}
            onChange={(e) => handleStudentRepresentativeChange(e, "proposedStudentRepresentative2")}
          />
          <input
            type="text"
            id="proposedStudentRepresentativeUid"
            className='outline-none'
            placeholder="Student Representative UID"
            value={formData.proposedStudentRepresentative2.proposedStudentRepresentativeUid}
            onChange={(e) => handleStudentRepresentativeChange(e, "proposedStudentRepresentative2")}
          />
          <input
            type="tel"
            id="MobileNumber"
            className='outline-none'
            placeholder="Mobile Number"
            value={formData.proposedStudentRepresentative2.MobileNumber}
            onChange={(e) => handleStudentRepresentativeChange(e, "proposedStudentRepresentative2")}
          />
        </div>
      </div>

      {/* Student Joint Representative 1 */}
      <div className='border border-black p-3 mt-6'>
        <p>Proposed Student Joint Representative 1 details:</p>
        <div className='flex gap-3'>
          <input
            type="text"
            id="proposedStudentRepresentativeName"
            className='outline-none'
            placeholder="Student Representative Name"
            value={formData.proposedStudentJointRepresentative1.proposedStudentRepresentativeName}
            onChange={(e) => handleStudentRepresentativeChange(e, "proposedStudentJointRepresentative1")}
          />
          <input
            type="text"
            id="proposedStudentRepresentativeUid"
            className='outline-none'
            placeholder="Student Representative UID"
            value={formData.proposedStudentJointRepresentative1.proposedStudentRepresentativeUid}
            onChange={(e) => handleStudentRepresentativeChange(e, "proposedStudentJointRepresentative1")}
          />
          <input
            type="tel"
            id="MobileNumber"
            className='outline-none'
            placeholder="Mobile Number"
            value={formData.proposedStudentJointRepresentative1.MobileNumber}
            onChange={(e) => handleStudentRepresentativeChange(e, "proposedStudentJointRepresentative1")}
          />
        </div>
      </div>

      {/* Student Joint Representative 2 */}
      <div className='border border-black p-3 mt-6'>
        <p>Proposed Student Joint Representative 2 details:</p>
        <div className='flex gap-3'>
          <input
            type="text"
            id="proposedStudentRepresentativeName"
            className='outline-none'
            placeholder="Student Representative Name"
            value={formData.proposedStudentJointRepresentative2.proposedStudentRepresentativeName}
            onChange={(e) => handleStudentRepresentativeChange(e, "proposedStudentJointRepresentative2")}
          />
          <input
            type="text"
            id="proposedStudentRepresentativeUid"
            className='outline-none'
            placeholder="Student Representative UID"
            value={formData.proposedStudentJointRepresentative2.proposedStudentRepresentativeUid}
            onChange={(e) => handleStudentRepresentativeChange(e, "proposedStudentJointRepresentative2")}
          />
          <input
            type="tel"
            id="MobileNumber"
            className='outline-none'
            placeholder="Mobile Number"
            value={formData.proposedStudentJointRepresentative2.MobileNumber}
            onChange={(e) => handleStudentRepresentativeChange(e, "proposedStudentJointRepresentative2")}
          />
        </div>
      </div>

      {/* Submit Button */}
      <button onClick={submitHandler} className='mt-6 p-2 bg-blue-500 text-white'>Submit</button>
    </div>
  );
}

export default App;
