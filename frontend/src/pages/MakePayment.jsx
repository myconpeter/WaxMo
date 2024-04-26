import { useState } from "react";
import Menu from '../components/menu'
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";



const MakePayment = () => {

    const [selected, setSelected] = useState(null)

    const toggle = (i) => {


        if (selected === i) {
            return setSelected(null)

        }

        setSelected(i)
    }


    return (
        <div className='mt-2 p-2  '>
            <Menu PageName='Make Payment' />
            <div className="mt-8 relative mb-20">
                <p className="text-2xl text-black">Kindly Message Our Financial Team</p>
                <p className="text-overLay">To proceed to payment</p>

            </div>



            {data.map((item) => (
                <div className='mt-1 ml-1 bg-darkGray p-1 rounded-lg' key={item.id}>

                    <div className="flex  font-medium  justify-between items-center" onClick={() => toggle(item.id)}>
                        <h3 className='text-overLay text-sm'>{item.title}</h3>

                        <span>{selected === item.id ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />
                        }</span>

                    </div>



                    <a href={item.link} target="_blank" className={selected === item.id ? 'text-black text-sm mt-5' : ""}>{item.description} </a>

                </div>
            ))}

        </div>
    )
}



const data = [
    {
        id: 1,
        title: "- Udofa Michael -Financial administrator",
        link: "https://wa.me/message/EAVJIMQTENVHP1" ,
        description: " Make Payment  "
    },

    {
        id: 2,
        title: "- Peter Ekanem -Financial administrator",
        link: "https://wa.me/message/EAVJIMQTENVHP1" ,
        description: " Make Payment  "
    },

    {
        id: 3,
        title: "- Chris Victor -Financial administrator",
        link: "https://wa.me/message/EAVJIMQTENVHP1" ,
        description: " Make Payment  "
    },

    {
        id: 4,
        title: "- Udofa Michael -Financial administrator",
        link: "https://wa.me/message/EAVJIMQTENVHP1" ,
        description: " Make Payment  "
    },

]

export default MakePayment