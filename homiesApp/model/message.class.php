<?php

/** 
 * @Entity
 * @Table(name="fredouil.message")
 */
class message{

	/** @Id @Column(type="integer")
	 *  @GeneratedValue
	 */ 
	public $id;

	/** @Column(type="integer")
	 *
	 *  @ManyToOne(targetEntity="fredouil.utilisateur", inversedBy="id")
	 *  @JoinColumn(name="emetteur_id", referencedColumnName="id")
	*/
	public $emetteur = null;

	/** @Column(type="integer") */
	public $destinataire = null;

	/** @Column(type="integer") */
	public $parent = null;

	/** @Column(type="integer") */
	public $post = null;

	/** @Column(type="integer") */
	public $aime = null;
	
}

?>