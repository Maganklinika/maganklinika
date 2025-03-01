import React from 'react'

const DoctorProfile = () => {
    const { user } = useAuthContext();
    return (
        <div>
            <div className='card'>
                <div className='card-header'>
                    <h1>Profil</h1>
                </div>
                <div className='card-body'>
                    <div className='card-leftside'>
                        <div className='image'></div>
                        <div className='name'><h3>{user.name}</h3></div>
                    </div>
                    <div className='card-description'>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Earum temporibus omnis, cumque quaerat corporis nam saepe, quam quibusdam, quia ad tempore?
                            Nemo asperiores neque recusandae, esse voluptates officiis ipsam. Recusandae!
                        </p>
                    </div>
                    <div className='card-profile-form'>
                        <form>
                            <label htmlFor="name">
                                <p>Név:</p>
                            </label>
                            <input type="text" />
                            <label htmlFor="password">
                                <p>Új jelszó:</p>
                            </label>
                            <input type="text" />

                        </form>
                    </div>
                </div>
                <div className='card-footer'>

                </div>
            </div>
        </div>
    )
}

export default DoctorProfile