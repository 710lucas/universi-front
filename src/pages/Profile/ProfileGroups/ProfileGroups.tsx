import { useContext } from "react";
import { Link } from "react-router-dom";

import { ProfileContext } from "@/pages/Profile";

export function ProfileGroups() {
    const profileContext = useContext(ProfileContext);

    if (profileContext === null)
        return null;

    const groupCount = profileContext.profileListData.groups.length.toLocaleString('pt-BR', {
        minimumIntegerDigits: 2,
        useGrouping: false,
    })

    return (
        <div className="groups card">
            <div className="section">
                <div className="counter-wrapper">
                    <h2 className="card-heading">Grupos</h2>
                    <h2 className="card-heading counter">{groupCount}</h2>
                    {
                        profileContext.accessingLoggedUser
                        ? <Link className="create-group-button" to="/manage-group" title="Criar novo grupo">
                            <i className="bi bi-plus-circle-fill" />
                          </Link>
                        : null
                    }
                </div>

                <div className="items-wrapper">
                    {
                        profileContext.profileListData.groups.length <= 0
                        ? <div className="empty-groups">Não participa de um grupo.</div>
                        : <div className="show-items">
                            {
                                profileContext.profileListData.groups.map((group) => {
                                    return group === undefined ? null : (
                                        <Link to={`/group${group.path}`} className="group item" title={group.name} key={group.id}>
                                            {/* todo: set group url */}
                                            <img src={group.image} alt="" />
                                        </Link>
                                    );
                                })
                            }
                        </div>
                    }
                    {/* todo: All groups page */}
                    <Link to={""} className="show-all-items">Ver todos os grupos</Link>
                </div>
            </div>
        </div>
    );
}