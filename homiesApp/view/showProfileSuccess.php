<div class="cd-section">
	<div class="row">
		<div class="tim-typo">
			<h2 class="title">Mon profil</h2>
		</div>
	</div>
</div>
<div class="section">
	<div class="row">
		<div class="col-md-4">
			<div class="card card-profile">
				<div class="card-avatar">
					<a href="">
						<img class="img-rounded img-responsive" src="<?= $context->user->avatar; ?>">
					</a>
				</div>

				<div class="content">
					<h6 class="category text-gray"><?= $context->user->date_de_naissance->format( "d-m-Y" ); ?></h6>

					<h4 class="card-title"><?= ucfirst( $context->user->prenom ) ?> <?= ucfirst( $context->user->nom ) ?></h4>

					<p class="card-description">
						<strong>Statut : </strong>
						<?= $context->user->statut ?>
					</p>
					<a href="<?= $context->link( '' ) ?>" class="btn btn-info btn-round">Modifier</a>
				</div>
			</div>
		</div>

		<div class="col-md-8">

			<div class="card">
				<div class="content">
					<h3 class="category text-info">
						<i class="material-icons">create</i>
						Poster un message
					</h3>

					<div class="form-group form-info is-empty">
						<textarea class="form-control" placeholder="Ecrivez quelque chose ici..." rows="6"></textarea>
						<span class="material-input"></span>
					</div>
					<a href="" class="btn btn-info pull-right">Poster</a>
				</div>
			</div>


			<?php foreach ( $context->messages as $message ) : ?>
				<div class="card">
					<div class="content">
						<p class="card-description">
							<?= $message->post->texte; ?>
						</p>
						<div class="footer">
							<div class="author">
								<a href="">
									<img class="avatar img-raised" src="<?= $context->user->avatar; ?>">
									<span>
										<?= ucfirst( $message->emetteur->prenom ) ?> <?= ucfirst( $message->emetteur->nom ) ?>
									</span>
								</a>
								<i class="material-icons">play_arrow</i>
								<a href="">
								<span>
									<?= ucfirst( $message->destinataire->prenom ) ?> <?= ucfirst( $message->destinataire->nom ) ?>
								</span>
								</a>
							</div>
						</div>
					</div>
				</div>
			<?php endforeach; ?>
		</div>

	</div>
</div>