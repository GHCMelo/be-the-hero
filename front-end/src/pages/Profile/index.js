import React, {useState, useEffect} from 'react';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2, FiEdit } from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';

//IMG DOG
import dogImg from '../../assets/dog1.jpg';

export default function Profile(){
    const [incidents, setIncidents] = useState([]);
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleEditIncident() {
        await alert("Você editou com sucesso");
    }

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incidents => incidents.id !== id));
        } catch (err) {
            alert('Erro ao deletar, tente novamente...')
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Logo"/>
                <span>Bem-vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041"/>
                </button>
            </header>

            <div className="profile-incidents">
                <h1>CASOS CADASTRADOS</h1>
                <ul>
                    {incidents.map(incidents => (
                        
                        <li key={incidents.id}>
                        <img src={dogImg} alt="Teste"/>
                        <strong>CASO:</strong>
                        <p>{incidents.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incidents.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incidents.value)}</p>
                        
                        <button className="alter" type="button">
                            <FiEdit size={20} onClick={() => handleEditIncident()} color="#a8a8b3" />
                        </button>          

                        <button type="button" className="delete" onClick={() => {if(window.confirm('Are you sure to delete this record?')){ handleDeleteIncident(incidents.id)};}}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>    
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}