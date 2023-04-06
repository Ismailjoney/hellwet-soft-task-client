import React from 'react';

const Modal = ({ myUpdateTasks, setMyUpdateTasks,  refetch }) => {
    
     

    const handdleUpgrade = (event) => {
        setMyUpdateTasks('')
        event.preventDefault()

        const form = event.target;
        const title = form.title.value
        const details = form.details.value;
        const updateDoc = {
            title,
            details
        }
        console.log(updateDoc)

        fetch(`http://localhost:5000/usersdata/${myUpdateTasks}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateDoc)
        })
            .then(res => res.json())
            .then(data =>  {
                if(data.modifiedCount > 0){
                    refetch()
                }
            })
    }

    return (
        <div>
            < input type="checkbox" id="ModalUpdate" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="ModalUpdate" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">UpDate Your Data</h3>
                    <div>
                        <form onSubmit={handdleUpgrade} className='w-full md:w-96 bg-gray-800 p-8 shadow-2xl mx-2 md:mx-10 flex  flex-col justify-center'  >
                            <div className=' relative flex flex-col justify-center '>
                                <p className='font-semibold text-sm mt-2 text-white'>Tittle</p>
                                <input required name='title' className='my-2 p-2 rounded   font-semibold shadow-md' type="text" placeholder='Add a Title' />
                                <p className='font-semibold text-sm mt-2 text-white'>Details</p>
                                <textarea name='details' className='my-2 p-2   font-semibold rounded shadow-md' id="" placeholder='Add Some Details'></textarea>
                                <button type='submit' className='px-4 py-2 my-2 bg-blue-600 text-white rounded'>Add</button>
                            </div>


                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;