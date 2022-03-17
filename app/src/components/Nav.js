import { Menubar } from 'primereact/menubar';
const Navigation = () => {

const navlist = [
  {label: 'Home', icon: 'pi pi-fw pi-home', command: () => {
      window.location.href='/home';
  }},
  {label: 'About', icon: 'pi pi-fw pi-calendar', command: () =>{
      window.location.href='/about'
  }},
    { label: 'Login', icon: 'pi pi-fw pi-phone', command: () =>{
      window.location.href='/login'
  }}
]

    return(
        <div>
           <header>
              <nav>
                <ul>
                    <Menubar 
                        model={navlist}
                    />
                </ul>
              </nav>
           </header>
        </div>
    )
}

export default Navigation;