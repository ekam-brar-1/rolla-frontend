import shoppingitems from './res/shoppingitems.json';
export default function ShoppingItem() {
    return (
        <div class="col mb-5 w-10 d-flex flex-wrap flex-row m-3 "   >
                    { shoppingitems.map ((item)=>(  <div class="card m-3 " style ={{width:"200px"}}key={item.id}>
                           
                            <div class="badge bg-dark text-white position-absolute" style={{top: "0.5rem", right: "0.5rem"}}>Sale</div>
                          
                            <img class="card-img-top" src={item.image} alt="..."></img>
                           
                            <div class="card-body p-4">
                                <div class="text-center">
                                 
                                    <h5 class="fw-bolder">{item.name}</h5>
                                   
                                    <div class="d-flex justify-content-center small text-warning mb-2">
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                    </div>
                                   
                                    <span class="text-muted text-decoration-line-through">$20.00</span>
                                    {item.price}
                                </div>
                            </div>
                          
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Add to cart</a></div>
                            </div>
                        </div>))}
                    </div>
                    )

                    }
