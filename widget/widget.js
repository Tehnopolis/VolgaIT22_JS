'use strict';

// Widget component
class CgWidget extends React.Component {
	constructor(props) {
		super(props)

		// State
		this.state = { 
			step: 0,

			params: {
				// men: 4, women: 5
				gender: null,

				// eyeglasses: 210, sunglasses: 211
				eyewear_type: null,
				
				// near: 6, distance: 6, multifocal/progressive: 7
				lenstype: null,
				
				// small: 68, medium: 67, large: 66 || widerAverage: 66, average: 67, narrowerAverage: 68
				frame_size: null,
				
				// eyewear_type == 210
				// yes: true, no: false
				blue_light: null, 
				
				// eyewear_type == 211
				// dark: dark, light: light, transitioning: transition
				shade: null, 
				
				// long face: long, round face: round, in between: between
				face_shape: null,
				
				// sharp: sharp, rounded: rounded, in between: between
				facial_features: null, 
				
				// (optional) example: cat_eye
				shape: null,
				// (optional) example: ray_ban
				brand: null
			},
			hiddenParams: {
				// true || false
				visionCorrection: null,
				// true || false
				frameFromFace: false
			},

			showingBetween: false
		}

		// Bind methods
    	this.resetStep = this.resetStep.bind(this);
    	this.prevStep = this.prevStep.bind(this);
    	this.nextStep = this.nextStep.bind(this);
    	this.showBetween = this.showBetween.bind(this);

    	this.resetParams = this.resetParams.bind(this);
    	this.setParam = this.setParam.bind(this);
    	this.setHiddenParam = this.setHiddenParam.bind(this);

    	this.getGender = this.getGender.bind(this);
	}

	// Steps
	resetStep() {
		const finalStep = 0
		this.setState({ step: finalStep, showingBetween: false })
		this.resetParams(finalStep)
	}
	prevStep() {
		const finalStep = this.state.step - 1
		this.setState({ step: finalStep, showingBetween: false })
		this.resetParams(finalStep)
	}
	nextStep(showBetween = false) {
		this.setState({ step: this.state.step + 1 })

		if(showBetween === true)
			this.showBetween()
	}
	showBetween() {
		// Show between
		this.setState({ showingBetween: true })
		// Hide between after seconds
		setTimeout(() => {
			this.setState({ showingBetween: false })
		}, 3000)
	}

	// Params
	resetParams(step) {
		// Reset all
		if(step == 0) {
			// Make params values null
			let paramsValue = {}
			Object.keys(this.state.params).forEach(paramName => paramsValue[paramName] = null)
			// Assign null params
			this.setState({
				params: paramsValue
			})
		}
		// Reset mid-step 3 values
		else if(step < 3) {
			this.setParam('lenstype', null, false)
			this.setHiddenParam('visionCorrection', null)
		}
	}
	setParam(paramName, paramValue, doNextStep = true, showBetween = false) {
		this.setState((prevState) => {
			let prevParams = prevState.params
			prevParams[paramName] = paramValue

			return { params: prevParams }
		})

		// To next step
		if(doNextStep)
			this.nextStep(showBetween)
	}
	setHiddenParam(paramName, paramValue, showBetween = false) {
		this.setState((prevState) => {
			let prevParams = prevState.hiddenParams
			prevParams[paramName] = paramValue

			return { hiddenParams: prevParams }
		})

		if(showBetween)
			this.showBetween()
	}
	getGender() {
		return this.state.params.gender == '4' ? 'women' : 'men'
	}

	render() {
		return (
			<div className="cg-widget">
				{ /* Navbar */ }
				{this.state.step === 0 || this.state.step === 11 ? (
					<div className="cg-widget-topbar">
						<img src="public/img/logo.png" alt="OptimaxDev Logo" />
						<img onClick={this.nextStep} className="clickable" src="public/img/arrow_right.svg" />
					</div>
				) : (
					<div className="cg-widget-topbar">
						<img onClick={this.prevStep} className="clickable" src="public/img/arrow_left.svg" />
						<p>{this.state.step}/10</p>
						<img onClick={this.resetStep} className="clickable" src="public/img/cross.svg" />
					</div>
				)}

				<div className="cg-widget-content">
					<div className="cg-widget-progress">
						<span style={{ width: `${this.state.step}0%` }}></span>
					</div>

					{ /* Page 0: Introduction */ }
					<div className={`cg-widget-page accent ${this.state.step == 0 ? 'visible' : ''}`}>
						<img className="illustration" src="public/img/glasses.png" alt="OptimaxDev Glasses" />

						<h1>Let's find your perfect pair!</h1>
						<p>Take the quiz to easily discover your perfect fit from thousands of styles</p>
						<button className="button" onClick={this.nextStep}>Start Now</button>
					</div>

					{ /* Page 1: Gender */ }
					<div className={`cg-widget-page ${this.state.step == 1 ? 'visible' : ''}`}>
						<h2>You are looking for</h2>
						<div className="card card-image" onClick={() => { this.setParam('gender', '4') }}>
							<img src="public/img/women.svg" />
							<p>Women's Styles</p>
						</div>
						<div className="card card-image" onClick={() => { this.setParam('gender', '5') }}>
							<img src="public/img/men.svg" />
							<p>Men's Styles</p>
						</div>
						
						<button className="link" onClick={this.nextStep}>I'd like to see both</button>
					</div>

					{ /* Page 2: Type */ }
					<div className={`cg-widget-page ${this.state.step == 2 ? 'visible' : ''}`}>
						<h2>What type of glasses are you looking for?</h2>
						<div className="card card-image" onClick={() => { this.setParam('eyewear_type', '210', true, true) }}>
							<img src={`public/img/${this.getGender()}_eyeglasses.png`} />
							<p>Eyeglasses</p>
						</div>
						<div className="card card-image" onClick={() => { this.setParam('eyewear_type', '211', true, true) }}>
							<img src={`public/img/${this.getGender()}_sunglasses.png`} />
							<p>Sunglasses</p>
						</div>
						
						<button className="link" onClick={() => { this.nextStep(true) }}>I'd like to see both</button>
					</div>

					{ /* Page 3: Vision */ }
					<div className={`cg-widget-page ${this.state.step == 3 ? 'visible' : ''}`}>
						{ this.state.showingBetween && (
							<div>
								<img className="like" src="public/img/like.svg" />
								<h3>Let's get to know you!</h3>
							</div>
						)}
						{ !this.state.showingBetween && this.state.hiddenParams.visionCorrection === null && (
							<div>
								<h2>Do you need vision correction?</h2>
								<div className="card card-image" onClick={() => { this.setHiddenParam('visionCorrection', true) }}>
									<p>Yes</p>
								</div>
								<div className="card card-image" onClick={this.nextStep}>
									<p>No</p>
								</div>
								
								<button className="link" onClick={this.nextStep}>Skip</button>
							</div>
						)}
						{ !this.state.showingBetween && this.state.hiddenParams.visionCorrection === true && (
							<div>
								<h2>What do you need your glasses for?</h2>
								<div className="card card-image card-smaller" onClick={() => { this.setParam('lenstype', '6') }}>
									<p>Near Vision</p>
								</div>
								<div className="card card-image card-smaller" onClick={() => { this.setParam('lenstype', '6') }}>
									<p>Distance Vision</p>
								</div>
								<div className="card card-image card-smaller" onClick={() => { this.setParam('lenstype', '7') }}>
									<p>Multifocal / Progressive</p>
								</div>
								
								<button className="link" onClick={this.nextStep}>Skip</button>
							</div>
						)}
					</div>

					{ /* Page 4: Frame size */ }
					<div className={`cg-widget-page ${this.state.step == 4 ? 'visible' : ''}`}>
						{ this.state.showingBetween && (
							<div>
								<img className="like" src="public/img/like.svg" />
								<h3>No worries, we’ve got you!</h3>
							</div>
						)}
						{ !this.state.showingBetween && this.state.hiddenParams.frameFromFace === false && (
							<div>
							<h2>What’s your current frame size?</h2>
							<img src="public/img/frame_sizes.png" alt="Frame sizes" className="image-medium" />
							<div className="card card-image card-smaller card-withtext" onClick={() => { this.setParam('frame_size', '68') }}>
								<p>Small</p>
								<p className="text">42-48 mm</p>
							</div>
							<div className="card card-image card-smaller card-withtext" onClick={() => { this.setParam('frame_size', '67') }}>
								<p>Medium</p>
								<p className="text">49-53 mm</p>
							</div>
							<div className="card card-image card-smaller card-withtext" onClick={() => { this.setParam('frame_size', '66') }}>
								<p>Large</p>
								<p className="text">54-58 mm</p>
							</div>
							
							<button className="link" onClick={() => { this.setHiddenParam('frameFromFace', true, true) }}>I don't know</button>
							</div>
						)}
						{ !this.state.showingBetween && this.state.hiddenParams.frameFromFace === true && (
							<div>
								<h2>How wide would you say your face is?</h2>
								<div className="card card-image card-smaller" onClick={() => { this.setParam('frame_size', '66') }}>
									<p>Wider Than Average</p>
								</div>
								<div className="card card-image card-smaller" onClick={() => { this.setParam('frame_size', '67') }}>
									<p>Average</p>
								</div>
								<div className="card card-image card-smaller" onClick={() => { this.setParam('frame_size', '68') }}>
									<p>Narrower Than Average</p>
								</div>
								
								<button className="link" onClick={this.nextStep}>I'm not sure</button>
							</div>
						)}
					</div>

					{ /* Page 5: Shade */ }
					<div className={`cg-widget-page ${this.state.step == 5 ? 'visible' : ''}`}>
						{ (this.state.params.eyewear_type === null || this.state.params.eyewear_type === '210') && (
							<div>
								<h2>Would you like to protect your eyes from light emanating from screens?</h2>
								<div className="card card-image" onClick={() => { this.setParam('blue_light', 'true') }}>
									<p>Yes</p>
								</div>
								<div className="card card-image" onClick={() => { this.setParam('blue_light', 'false') }}>
									<p>No</p>
								</div>
							</div>
						)}
						{ this.state.params.eyewear_type === '211' && (
							<div>
								<h2>When you’re out and about, which shade of lenses do you prefer?</h2>
								<div className="card card-image-split" onClick={() => { this.setParam('shade', 'dark') }}>
									<img src={`public/img/shade_dark.png`} />
									<div className="vr"></div>
									<p>Dark Shade</p>
								</div>
								<div className="card card-image-split" onClick={() => { this.setParam('shade', 'light') }}>
									<img src={`public/img/shade_light.png`} />
									<div className="vr"></div>
									<p>Light Shade</p>
								</div>
								<div className="card card-image-split" onClick={() => { this.setParam('shade', 'transition') }}>
									<img src={`public/img/shade_transition.png`} />
									<div className="vr"></div>
									<p>Transitioning Shade</p>
								</div>
							</div>
						)}
					</div>

					{ /* Page 6: Face */ }
					<div className={`cg-widget-page ${this.state.step == 6 ? 'visible' : ''}`}>
						<h2>Every face shape has a perfect fit. What’s yours?</h2>
						<div className="card card-image-split" onClick={() => { this.setParam('face_shape', 'long') }}>
							<img src={`public/img/${this.getGender()}_long_face.png`} />
							<div className="vr"></div>
							<p>I have a long face</p>
						</div>
						<div className="card card-image-split" onClick={() => { this.setParam('face_shape', 'round') }}>
							<img src={`public/img/${this.getGender()}_round_face.png`} />
							<div className="vr"></div>
							<p>I have a round face</p>
						</div>
						<div className="card card-image-split" onClick={() => { this.setParam('face_shape', 'between') }}>
							<img src={`public/img/${this.getGender()}_between_face.png`} />
							<div className="vr"></div>
							<p>In between</p>
						</div>

						<button className="link" onClick={() => { this.nextStep(true) }}>I don't know</button>
					</div>

					{ /* Page 7: Facial features */ }
					<div className={`cg-widget-page ${this.state.step == 7 ? 'visible' : ''}`}>
						<h2>How would you define your facial features?</h2>
						<div className="card card-image card-smaller" onClick={() => { this.setParam('facial_features', 'sharp') }}>
							<p>Sharp</p>
						</div>
						<div className="card card-image card-smaller" onClick={() => { this.setParam('facial_features', 'rounded') }}>
							<p>Rounded</p>
						</div>
						<div className="card card-image card-smaller" onClick={() => { this.setParam('facial_features', 'between') }}>
							<p>In between</p>
						</div>
						
						<button className="link" onClick={this.nextStep}>I don't know</button>
					</div>

					{ /* Page 8: Frame style */ }
					<div className={`cg-widget-page ${this.state.step == 8 ? 'visible' : ''}`}>
						<h2>Which frame style are you looking for?</h2>
						
						<div className="scroll-panel">
							<div className="scroll-panel-row">
								<div className={`card card-image ${this.state.params.shape === 'rectangle' ? 'active' : ''}`} onClick={() => { this.setParam('shape', 'rectangle', false, false) }}>
									<img src={`public/img/shape_rectangle.png`} />
									<p>Rectangle</p>
								</div>
								<div className={`card card-image ${this.state.params.shape === 'browline' ? 'active': ''}`} onClick={() => { this.setParam('shape', 'browline', false, false) }}>
									<img src={`public/img/shape_browline.png`} />
									<p>Browline</p>
								</div>
								<div className={`card card-image ${this.state.params.shape === 'aviator' ? 'active': ''}`} onClick={() => { this.setParam('shape', 'aviator', false, false) }}>
									<img src={`public/img/shape_aviator.png`} />
									<p>Aviator</p>
								</div>
								<div className={`card card-image ${this.state.params.shape === 'geometric' ? 'active': ''}`} onClick={() => { this.setParam('shape', 'geometric', false, false) }}>
									<img src={`public/img/shape_geometric.png`} />
									<p>Geometric</p>
								</div>
							</div>
							<div className="scroll-panel-row">
								<div className={`card card-image ${this.state.params.shape === 'wayframe' ? 'active': ''}`} onClick={() => { this.setParam('shape', 'wayframe', false, false) }}>
									<img src={`public/img/shape_wayframe.png`} />
									<p>Wayframe</p>
								</div>
								<div className={`card card-image ${this.state.params.shape === 'round' ? 'active': ''}`} onClick={() => { this.setParam('shape', 'round', false, false) }}>
									<img src={`public/img/shape_round.png`} />
									<p>Round</p>
								</div>
								<div className={`card card-image ${this.state.params.shape === 'oval' ? 'active': ''}`} onClick={() => { this.setParam('shape', 'oval', false, false) }}>
									<img src={`public/img/shape_oval.png`} />
									<p>Oval</p>
								</div>
								<div className={`card card-image ${this.state.params.shape === 'oversized' ? 'active': ''}`} onClick={() => { this.setParam('shape', 'oversized', false, false) }}>
									<img src={`public/img/shape_oversized.png`} />
									<p>Oversized</p>
								</div>
							</div>
							<div className="scroll-panel-row">
								<div className={`card card-image ${this.state.params.shape === 'cat_eye' ? 'active': ''}`} onClick={() => { this.setParam('shape', 'cat_eye', false, false) }}>
									<img src={`public/img/shape_cat_eye.png`} />
									<p>Cat eye</p>
								</div>
								<div className={`card card-image ${this.state.params.shape === 'rimless' ? 'active': ''}`} onClick={() => { this.setParam('shape', 'rimless', false, false) }}>
									<img src={`public/img/shape_rimless.png`} />
									<p>Rimless</p>
								</div>
								<div className={`card card-image ${this.state.params.shape === 'square' ? 'active': ''}`} onClick={() => { this.setParam('shape', 'square', false, false) }}>
									<img src={`public/img/shape_square.png`} />
									<p>Square</p>
								</div>
								<div className={`card card-image ${this.state.params.shape === 'wrap' ? 'active': ''}`} onClick={() => { this.setParam('shape', 'wrap', false, false) }}>
									<img src={`public/img/shape_wrap.png`} />
									<p>Wrap</p>
								</div>
							</div>
						</div>
						
						<button className="button" disabled={!this.state.params.shape} onClick={this.nextStep}>Continue</button>
					</div>
					{ /* Page 9: need Brand? */ }
					<div className={`cg-widget-page ${this.state.step == 9 ? 'visible' : ''}`}>
						<h2>Are you looking for any particular eyewear brands?</h2>
						<div className="card card-image" onClick={() => { this.nextStep() }}>
							<p>Yes, I have some in mind</p>
						</div>
						<div className="card card-image" onClick={() => { this.nextStep() && this.nextStep() }}>
							<p>No, brand isn't important</p>
						</div>
					</div>
					{ /* Page 10: Brand */ }
					<div className={`cg-widget-page ${this.state.step == 10 ? 'visible' : ''}`}>
						<h2>Choose your favorite brands</h2>
						
						<div className="scroll-panel">
							<div className="scroll-panel-row">
								<div className={`card card-image ${this.state.params.brand === 'ray_ban' ? 'active' : ''}`} onClick={() => { this.setParam('brand', 'ray_ban', false, false) }}>
									<img src={`public/img/brand_ray_ban.png`} />
								</div>
								<div className={`card card-image ${this.state.params.brand === 'oakley' ? 'active' : ''}`} onClick={() => { this.setParam('brand', 'oakley', false, false) }}>
									<img src={`public/img/brand_oakley.png`} />
								</div>
								<div className={`card card-image ${this.state.params.brand === 'gucci' ? 'active': ''}`} onClick={() => { this.setParam('brand', 'gucci', false, false) }}>
									<img src={`public/img/brand_gucci.png`} />
								</div>
								<div className={`card card-image ${this.state.params.brand === 'aviator' ? 'active': ''}`} onClick={() => { this.setParam('brand', 'aviator', false, false) }}>
									<img src={`public/img/brand_armani_exchange.png`} />
								</div>
							</div>
							<div className="scroll-panel-row">
								<div className={`card card-image ${this.state.params.brand === 'hilary_duff' ? 'active' : ''}`} onClick={() => { this.setParam('brand', 'hilary_duff', false, false) }}>
									<img src={`public/img/brand_hilary_duff.png`} />
								</div>
								<div className={`card card-image ${this.state.params.brand === 'prada' ? 'active': ''}`} onClick={() => { this.setParam('brand', 'prada', false, false) }}>
									<img src={`public/img/brand_prada.png`} />
								</div>
								<div className={`card card-image ${this.state.params.brand === 'versace' ? 'active': ''}`} onClick={() => { this.setParam('brand', 'versace', false, false) }}>
									<img src={`public/img/brand_versace.png`} />
								</div>
								<div className={`card card-image ${this.state.params.brand === 'vogue' ? 'active': ''}`} onClick={() => { this.setParam('brand', 'vogue', false, false) }}>
									<img src={`public/img/brand_vogue.png`} />
								</div>
							</div>
							<div className="scroll-panel-row">
								<div className={`card card-image ${this.state.params.brand === 'michael_kors' ? 'active' : ''}`} onClick={() => { this.setParam('brand', 'michael_kors', false, false) }}>
									<img src={`public/img/brand_michael_kors.png`} />
								</div>
								<div className={`card card-image ${this.state.params.brand === 'coach' ? 'active': ''}`} onClick={() => { this.setParam('brand', 'coach', false, false) }}>
									<img src={`public/img/brand_coach.png`} />
								</div>
								<div className={`card card-image ${this.state.params.brand === 'tory_burch' ? 'active': ''}`} onClick={() => { this.setParam('brand', 'tory_burch', false, false) }}>
									<img src={`public/img/brand_tory_burch.png`} />
								</div>
								<div className={`card card-image ${this.state.params.brand === 'burberry' ? 'active': ''}`} onClick={() => { this.setParam('brand', 'burberry', false, false) }}>
									<img src={`public/img/brand_burberry.png`} />
								</div>
							</div>
						</div>
						
						<button className="button" disabled={!this.state.params.brand} onClick={this.nextStep}>Continue</button>
					</div>
					{ /* Page 11: Finish (Send) */ }
					<div className={`cg-widget-page ${this.state.step == 11 ? 'visible' : ''}`}>
						<img className="illustration-gift" src="public/img/gift.png" alt="OptimaxDev Glasses" />

						<h1>We've found some awesome frames for you!</h1>
						<p>Send the results to your email to receive special discounts.</p>
						<button className="button" onClick={() => {this.finish(this.props.url, this.state.params)}}>Send</button>

						<small>
							By clicking ‘Send’ you agree to our Terms of Use & Privacy Policy and receiving promotion emails
						</small>
					</div>
				</div>
			</div>
		)
	}

	finish(url, params) {
		// Iterate all params
		Object.keys(params).forEach(paramName => {
			// Value defined -> add to url
			if(params[paramName] !== null)
				url += `&${paramName}=${params[paramName]}`
		})

		// Log final url
		console.log(url)
	}
}

// Render widget in #glasses-quiz-widget
const chooseGlassesWidget = document.querySelector('#glasses-quiz-widget');
ReactDOM.render(
	<CgWidget url={chooseGlassesWidget.getAttribute('data-source')}></CgWidget>,
	chooseGlassesWidget
);