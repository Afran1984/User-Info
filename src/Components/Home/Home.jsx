
import Swal from "sweetalert2";



const Home = () => {
    const handleSubmit = async e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const number = formData.get('number');
        const email = formData.get('email');
        const file = formData.get('file');
        const gender = formData.get('gender');
        const rememberMe = formData.get('rememberMe') === 'on';
      
        const data = {
          name,
          number,
          email,
          rememberMe,
          file,
          gender
        };
      
        try {
          const response = await fetch('http://localhost:5000/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
      
          if (response.ok) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Data Submit Successfuly',
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            alert('Failed to submit user data');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred while submitting the form');
        }
      };
      
    return (
      <div className="hero bg-base-200 w-full mx-auto">
        <div className="hero-content">
          <div className="card bg-base-100 w-full">
            <form className="card-body" onSubmit={handleSubmit}>
              <h2 className="text-2xl text-center">USER INFO</h2>
              <p>Showing Dashboard: <span className="bg-accent text-3xl">localhost:5173/dashbord</span></p>
  
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="input input-bordered w-full"
                  required
                />
              </div>
  
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Contact Number</span>
                </label>
                <input
                  type="text"
                  name="number"
                  placeholder="Number"
                  className="input input-bordered w-full"
                  required
                />
              </div>
  
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered w-full"
                  required
                />
              </div>
  
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Pick a file</span>
                </div>
                <input
                  type="file"
                  name="file"
                  className="file-input file-input-bordered w-full max-w-xs"
                />
              </label>
  
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Gender</span>
                </label>
                <div className="flex items-center space-x-4">
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      className="radio radio-primary"
                    />
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      className="radio radio-primary"
                    />
                    Female
                  </label>
                </div>
              </div>
  
              <div className="form-control w-full">
                <label className="cursor-pointer label">
                  <span className="label-text">Remember Me?</span>
                  <input
                    type="checkbox"
                    name="rememberMe"
                    defaultChecked
                    className="checkbox checkbox-success"
                  />
                </label>
              </div>
  
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
  
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary w-full">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  export default Home;
  
